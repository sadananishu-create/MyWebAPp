import type { ContentItem } from '@kidstream/shared/src/types.js';

/**
 * Filters content for kid-safety.
 *
 * Multi-layer approach:
 * 1. Keyword blocklist — fast, catches obvious issues
 * 2. Platform safety flags — use YouTube's safeSearch, Instagram's content labels
 * 3. AI classification (future) — fine-tuned model for nuanced safety detection
 */

const BLOCKED_KEYWORDS = [
  'violence', 'weapon', 'horror', 'scary', 'blood',
  'gambling', 'alcohol', 'smoking', 'drug',
];

export function filterSafeContent(items: ContentItem[]): ContentItem[] {
  return items.filter((item) => {
    const text = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase();
    return !BLOCKED_KEYWORDS.some((kw) => text.includes(kw));
  });
}
