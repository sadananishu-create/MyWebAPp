import type { ContentItem } from '@kidstream/shared/src/types.js';

/**
 * Ranks content based on a kid's preferences.
 *
 * Scoring factors:
 * 1. Interest match — tags overlap with kid's declared interests
 * 2. Engagement history — boost topics the kid has liked/watched before
 * 3. Freshness — slight recency bias
 * 4. Diversity — avoid showing too much of the same topic in a row
 *
 * Currently uses a simple tag-matching heuristic.
 * Will be replaced by a proper scoring model as we collect signals.
 */

// Mock interests — will come from kid profile in DB
const DEFAULT_INTERESTS = ['dinosaurs', 'space', 'drawing', 'science', 'lego'];

export function rankByPreference(
  items: ContentItem[],
  _kidProfileId: string,
): ContentItem[] {
  const scored = items.map((item) => {
    let score = 0;

    // Interest match: each matching tag adds weight
    for (const tag of item.tags) {
      if (DEFAULT_INTERESTS.includes(tag.toLowerCase())) {
        score += 10;
      }
    }

    // Freshness bonus: newer content gets a small boost
    const ageHours = (Date.now() - new Date(item.publishedAt).getTime()) / (1000 * 60 * 60);
    score += Math.max(0, 5 - ageHours / 24); // up to 5 points for content < 5 days old

    item.relevanceScore = score;
    return item;
  });

  // Sort by score descending
  scored.sort((a, b) => (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0));

  return scored;
}
