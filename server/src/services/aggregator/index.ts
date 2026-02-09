import type { ContentItem, ContentPlatform } from '@kidstream/shared/src/types.js';
import { fetchYouTube } from './youtube.js';
import { fetchShorts } from './shorts.js';
import { fetchReels } from './reels.js';
import { fetchImages } from './images.js';

interface AggregateOptions {
  platforms?: ContentPlatform[];
  cursor?: string;
  limit: number;
}

const fetchers: Record<ContentPlatform, (limit: number) => Promise<ContentItem[]>> = {
  youtube: fetchYouTube,
  youtube_shorts: fetchShorts,
  instagram_reels: fetchReels,
  image: fetchImages,
};

/**
 * Fetches content from all requested platforms in parallel,
 * then merges results into a single list sorted by publish date.
 */
export async function aggregateContent(options: AggregateOptions): Promise<ContentItem[]> {
  const activePlatforms = options.platforms ?? (['youtube', 'youtube_shorts', 'instagram_reels', 'image'] as ContentPlatform[]);
  const perPlatformLimit = Math.ceil(options.limit / activePlatforms.length);

  const results = await Promise.allSettled(
    activePlatforms.map((platform) => fetchers[platform](perPlatformLimit)),
  );

  const items: ContentItem[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      items.push(...result.value);
    }
  }

  // Sort by newest first
  items.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return items;
}
