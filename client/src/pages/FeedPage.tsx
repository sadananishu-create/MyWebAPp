import { useFeedStore } from '../store/feedStore';
import ContentCard from '../components/ContentCard';
import PlatformFilter from '../components/PlatformFilter';
import type { ContentItem } from '@kidstream/shared/src/types';

// Demo data for initial scaffold — will be replaced by API calls
const DEMO_ITEMS: ContentItem[] = [
  {
    id: '1',
    platform: 'youtube',
    type: 'video',
    title: 'Amazing Dinosaur Facts for Kids!',
    description: 'Learn cool facts about T-Rex, Triceratops, and more.',
    thumbnailUrl: 'https://placehold.co/640x360/6366f1/white?text=Dinosaurs',
    sourceUrl: '#',
    duration: 312,
    creatorName: 'DinoWorld Kids',
    tags: ['dinosaurs', 'education', 'animals'],
    publishedAt: '2026-02-01T10:00:00Z',
  },
  {
    id: '2',
    platform: 'youtube_shorts',
    type: 'short',
    title: 'How to Draw a Rocket in 30 Seconds',
    description: 'Quick drawing tutorial for kids.',
    thumbnailUrl: 'https://placehold.co/640x360/ec4899/white?text=Drawing',
    sourceUrl: '#',
    duration: 30,
    creatorName: 'Art4Kids',
    tags: ['drawing', 'art', 'space'],
    publishedAt: '2026-02-05T14:00:00Z',
  },
  {
    id: '3',
    platform: 'instagram_reels',
    type: 'reel',
    title: 'Cool Science Experiment at Home',
    description: 'Make a volcano with baking soda!',
    thumbnailUrl: 'https://placehold.co/640x360/f59e0b/white?text=Science',
    sourceUrl: '#',
    duration: 45,
    creatorName: 'ScienceIsFun',
    tags: ['science', 'experiments', 'DIY'],
    publishedAt: '2026-02-07T08:00:00Z',
  },
  {
    id: '4',
    platform: 'image',
    type: 'image',
    title: 'Space Coloring Page — Solar System',
    description: 'Download and color the planets.',
    thumbnailUrl: 'https://placehold.co/640x360/10b981/white?text=Coloring',
    sourceUrl: '#',
    creatorName: 'ColorZone',
    tags: ['coloring', 'space', 'art'],
    publishedAt: '2026-02-08T12:00:00Z',
  },
];

export default function FeedPage() {
  const { platformFilters, setPlatformFilters } = useFeedStore();

  const filtered = DEMO_ITEMS.filter((item) =>
    platformFilters.includes(item.platform),
  );

  return (
    <div>
      <PlatformFilter selected={platformFilters} onChange={setPlatformFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-4">
        {filtered.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            onLike={(id) => console.log('liked', id)}
            onSkip={(id) => console.log('skipped', id)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-gray-400 py-12">
            No content matches your filters. Try enabling more platforms.
          </p>
        )}
      </div>
    </div>
  );
}
