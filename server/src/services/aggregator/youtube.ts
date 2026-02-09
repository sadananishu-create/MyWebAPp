import type { ContentItem } from '@kidstream/shared/src/types.js';

/**
 * Fetches videos from YouTube Data API.
 * Currently returns mock data — replace with real API call.
 */
export async function fetchYouTube(limit: number): Promise<ContentItem[]> {
  // TODO: Integrate YouTube Data API v3
  // GET https://www.googleapis.com/youtube/v3/search
  //   ?part=snippet&type=video&safeSearch=strict
  //   &maxResults={limit}&key={YOUTUBE_API_KEY}

  return [
    {
      id: 'yt-1',
      platform: 'youtube',
      type: 'video',
      title: 'Amazing Dinosaur Facts for Kids!',
      description: 'Learn cool facts about T-Rex, Triceratops, and more.',
      thumbnailUrl: 'https://placehold.co/640x360/6366f1/white?text=Dinosaurs',
      sourceUrl: 'https://youtube.com/watch?v=example1',
      duration: 312,
      creatorName: 'DinoWorld Kids',
      tags: ['dinosaurs', 'education', 'animals'],
      publishedAt: '2026-02-01T10:00:00Z',
    },
    {
      id: 'yt-2',
      platform: 'youtube',
      type: 'video',
      title: 'Solar System Tour for Children',
      description: 'Visit every planet in our solar system!',
      thumbnailUrl: 'https://placehold.co/640x360/3b82f6/white?text=Space',
      sourceUrl: 'https://youtube.com/watch?v=example2',
      duration: 480,
      creatorName: 'SpaceKids',
      tags: ['space', 'science', 'planets'],
      publishedAt: '2026-02-03T09:00:00Z',
    },
  ].slice(0, limit);
}
