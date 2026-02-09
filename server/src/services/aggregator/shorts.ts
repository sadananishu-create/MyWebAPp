import type { ContentItem } from '@kidstream/shared/src/types.js';

/**
 * Fetches YouTube Shorts. Mock data — replace with API integration.
 */
export async function fetchShorts(limit: number): Promise<ContentItem[]> {
  return [
    {
      id: 'short-1',
      platform: 'youtube_shorts',
      type: 'short',
      title: 'How to Draw a Rocket in 30 Seconds',
      description: 'Quick drawing tutorial for kids.',
      thumbnailUrl: 'https://placehold.co/640x360/ec4899/white?text=Drawing',
      sourceUrl: 'https://youtube.com/shorts/example1',
      duration: 30,
      creatorName: 'Art4Kids',
      tags: ['drawing', 'art', 'space'],
      publishedAt: '2026-02-05T14:00:00Z',
    },
  ].slice(0, limit);
}
