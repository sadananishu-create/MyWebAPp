import type { ContentPlatform } from '@kidstream/shared/src/types';

interface PlatformFilterProps {
  selected: ContentPlatform[];
  onChange: (platforms: ContentPlatform[]) => void;
}

const platforms: { id: ContentPlatform; label: string }[] = [
  { id: 'youtube', label: 'YouTube' },
  { id: 'youtube_shorts', label: 'Shorts' },
  { id: 'instagram_reels', label: 'Reels' },
  { id: 'image', label: 'Images' },
];

export default function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  const toggle = (id: ContentPlatform) => {
    if (selected.includes(id)) {
      onChange(selected.filter((p) => p !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
      {platforms.map(({ id, label }) => {
        const active = selected.includes(id);
        return (
          <button
            key={id}
            onClick={() => toggle(id)}
            className={`whitespace-nowrap text-xs font-medium px-3 py-1.5 rounded-full border transition ${
              active
                ? 'bg-primary-600 text-white border-primary-600'
                : 'bg-white text-gray-600 border-gray-200 hover:border-primary-300'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
