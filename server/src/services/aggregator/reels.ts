import type { ContentItem } from '@kidstream/shared/src/types.js';

/**
 * Fetches Instagram Reels. Mock data — replace with API integration.
 */
export async function fetchReels(limit: number): Promise<ContentItem[]> {
  return [
    {
      id: 'reel-1',
      platform: 'instagram_reels',
      type: 'reel',
      title: 'Cool Science Experiment at Home',
      description: 'Make a volcano with baking soda!',
      thumbnailUrl: 'https://placehold.co/640x360/f59e0b/white?text=Science',
      sourceUrl: 'https://instagram.com/reel/example1',
      duration: 45,
      creatorName: 'ScienceIsFun',
      tags: ['science', 'experiments', 'DIY'],
      publishedAt: '2026-02-07T08:00:00Z',
    },
  ].slice(0, limit);
}
