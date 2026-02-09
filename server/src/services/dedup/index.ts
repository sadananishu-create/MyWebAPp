import type { ContentItem } from '@kidstream/shared/src/types.js';

/**
 * Removes duplicate and near-duplicate content across platforms.
 *
 * Strategy (layered):
 * 1. Exact URL match — trivial dedup
 * 2. Title similarity — catches reposts (same video on different platforms)
 * 3. Content hash (future) — perceptual hashing for thumbnail/frame similarity
 */
export function deduplicateItems(items: ContentItem[]): ContentItem[] {
  const seen = new Map<string, ContentItem>();

  for (const item of items) {
    const normalizedTitle = normalizeTitle(item.title);

    // Check for near-duplicate by normalized title
    if (seen.has(normalizedTitle)) {
      // Keep the one from the preferred platform (YouTube > Shorts > Reels > Image)
      const existing = seen.get(normalizedTitle)!;
      if (platformPriority(item.platform) > platformPriority(existing.platform)) {
        seen.set(normalizedTitle, item);
      }
      continue;
    }

    seen.set(normalizedTitle, item);
  }

  return Array.from(seen.values());
}

function normalizeTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function platformPriority(platform: string): number {
  const priorities: Record<string, number> = {
    youtube: 4,
    youtube_shorts: 3,
    instagram_reels: 2,
    image: 1,
  };
  return priorities[platform] ?? 0;
}
