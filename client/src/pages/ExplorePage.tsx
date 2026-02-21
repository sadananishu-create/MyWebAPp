import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore, ALL_TOPICS } from '../store/userStore';
import { DEMO_CONTENT } from '../data/demoContent';

// Count how many content items match each topic
function getTopicCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const item of DEMO_CONTENT) {
    for (const tag of item.tags) {
      const key = tag.toLowerCase();
      counts[key] = (counts[key] ?? 0) + 1;
    }
  }
  return counts;
}

export default function ExplorePage() {
  const navigate = useNavigate();
  const { interests } = useUserStore();
  const [query, setQuery] = useState('');
  const topicCounts = getTopicCounts();

  const lowerQuery = query.toLowerCase();
  const filteredTopics = ALL_TOPICS.filter((t) =>
    t.toLowerCase().includes(lowerQuery),
  );

  const yourTopics = filteredTopics.filter((t) =>
    interests.some((i) => i.toLowerCase() === t.toLowerCase()),
  );
  const otherTopics = filteredTopics.filter(
    (t) => !interests.some((i) => i.toLowerCase() === t.toLowerCase()),
  );

  const handleTopicClick = (topic: string) => {
    navigate(`/feed?topic=${encodeURIComponent(topic.toLowerCase())}`);
  };

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
      </div>

      {/* Your interests */}
      {yourTopics.length > 0 && (
        <section>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Your Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {yourTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition"
              >
                {topic}
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                  {topicCounts[topic.toLowerCase()] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* All topics */}
      <section>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          {yourTopics.length > 0 ? 'Discover More' : 'All Topics'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {otherTopics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary-50 text-primary-700 text-sm font-medium hover:bg-primary-100 transition"
            >
              {topic}
              {(topicCounts[topic.toLowerCase()] ?? 0) > 0 && (
                <span className="text-[10px] bg-primary-200 text-primary-700 px-1.5 py-0.5 rounded-full">
                  {topicCounts[topic.toLowerCase()]}
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {filteredTopics.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No topics match "{query}"</p>
        </div>
      )}
    </div>
  );
}
