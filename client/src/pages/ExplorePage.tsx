import { useState } from 'react';

const TOPICS = [
  'Dinosaurs', 'Space', 'Animals', 'Drawing', 'Science',
  'Music', 'Cooking', 'Sports', 'LEGO', 'Coding',
  'Nature', 'Robots', 'History', 'Dance', 'Origami',
];

export default function ExplorePage() {
  const [query, setQuery] = useState('');

  const filtered = TOPICS.filter((t) =>
    t.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="px-4 py-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search topics..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
      />

      {/* Topic chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {filtered.map((topic) => (
          <button
            key={topic}
            className="px-4 py-2 rounded-xl bg-primary-50 text-primary-700 text-sm font-medium hover:bg-primary-100 transition"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
}
