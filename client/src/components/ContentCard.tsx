import type { ContentItem } from '@kidstream/shared/src/types';

interface ContentCardProps {
  item: ContentItem;
  onLike?: (id: string) => void;
  onSkip?: (id: string) => void;
}

const platformBadgeColors: Record<string, string> = {
  youtube: 'bg-red-100 text-red-700',
  youtube_shorts: 'bg-red-100 text-red-700',
  instagram_reels: 'bg-pink-100 text-pink-700',
  image: 'bg-blue-100 text-blue-700',
};

const platformLabels: Record<string, string> = {
  youtube: 'YouTube',
  youtube_shorts: 'Shorts',
  instagram_reels: 'Reels',
  image: 'Image',
};

export default function ContentCard({ item, onLike, onSkip }: ContentCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200">
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Platform badge */}
        <span
          className={`absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
            platformBadgeColors[item.platform] ?? 'bg-gray-100 text-gray-700'
          }`}
        >
          {platformLabels[item.platform] ?? item.platform}
        </span>
        {/* Duration */}
        {item.duration != null && (
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
            {formatDuration(item.duration)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{item.creatorName}</p>

        {/* Actions */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={() => onLike?.(item.id)}
            className="flex-1 text-xs font-medium py-1.5 rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100 transition"
          >
            Like
          </button>
          <button
            onClick={() => onSkip?.(item.id)}
            className="flex-1 text-xs font-medium py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
