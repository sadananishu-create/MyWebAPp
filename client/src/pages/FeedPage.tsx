import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ContentCard from '../components/ContentCard';
import ContentViewer from '../components/ContentViewer';
import PlatformFilter from '../components/PlatformFilter';
import { useUserStore } from '../store/userStore';
import { DEMO_CONTENT } from '../data/demoContent';
import type { ContentItem, ContentPlatform } from '@kidstream/shared/src/types';

export default function FeedPage() {
  const { interests, platformFilters, setPlatformFilters, skippedIds } = useUserStore();
  const [viewingItem, setViewingItem] = useState<ContentItem | null>(null);
  const [searchParams] = useSearchParams();

  // If navigated from Explore with a topic filter
  const topicFilter = searchParams.get('topic')?.toLowerCase();

  // Filter and rank content
  const feedItems = useMemo(() => {
    let items = DEMO_CONTENT
      // Platform filter
      .filter((item) => platformFilters.includes(item.platform))
      // Remove skipped
      .filter((item) => !skippedIds.includes(item.id))
      // Topic filter from Explore
      .filter((item) =>
        topicFilter
          ? item.tags.some((t) => t.toLowerCase() === topicFilter)
          : true,
      );

    // Score by interest match
    items = items.map((item) => ({
      ...item,
      relevanceScore: item.tags.reduce(
        (score, tag) =>
          interests.some((i) => i.toLowerCase() === tag.toLowerCase()) ? score + 10 : score,
        0,
      ),
    }));

    // Sort: highest relevance first, then by date
    items.sort((a, b) => {
      const scoreDiff = (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0);
      if (scoreDiff !== 0) return scoreDiff;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return items;
  }, [platformFilters, skippedIds, interests, topicFilter]);

  return (
    <div>
      {/* Topic filter banner */}
      {topicFilter && (
        <div className="bg-primary-50 px-4 py-2 flex items-center justify-between">
          <span className="text-sm text-primary-700 font-medium">
            Showing: <span className="font-bold capitalize">{topicFilter}</span>
          </span>
          <a
            href="/feed"
            className="text-xs text-primary-600 font-medium hover:underline"
          >
            Clear filter
          </a>
        </div>
      )}

      <PlatformFilter selected={platformFilters} onChange={setPlatformFilters} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-4">
        {feedItems.map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            onOpen={setViewingItem}
          />
        ))}
        {feedItems.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-gray-500 font-medium">No content found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try enabling more platforms or adjusting your interests.
            </p>
          </div>
        )}
      </div>

      {/* Content viewer modal */}
      {viewingItem && (
        <ContentViewer item={viewingItem} onClose={() => setViewingItem(null)} />
      )}
    </div>
  );
}
