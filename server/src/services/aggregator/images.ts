import type { ContentItem } from '@kidstream/shared/src/types.js';

/**
 * Fetches image content. Mock data — replace with API integration.
 */
export async function fetchImages(limit: number): Promise<ContentItem[]> {
  return [
    {
      id: 'img-1',
      platform: 'image',
      type: 'image',
      title: 'Space Coloring Page — Solar System',
      description: 'Download and color the planets.',
      thumbnailUrl: 'https://placehold.co/640x360/10b981/white?text=Coloring',
      sourceUrl: 'https://example.com/coloring/solar-system',
      creatorName: 'ColorZone',
      tags: ['coloring', 'space', 'art'],
      publishedAt: '2026-02-08T12:00:00Z',
    },
  ].slice(0, limit);
}
