import { useState } from 'react';
import type { ContentItem } from '@kidstream/shared/src/types';
import { useUserStore } from '../store/userStore';

interface ContentCardProps {
  item: ContentItem;
  onOpen: (item: ContentItem) => void;
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

export default function ContentCard({ item, onOpen }: ContentCardProps) {
  const { likedIds, skippedIds, savedIds, likeContent, skipContent, saveContent, unsaveContent } = useUserStore();
  const [animating, setAnimating] = useState<'like' | 'skip' | null>(null);

  const isLiked = likedIds.includes(item.id);
  const isSkipped = skippedIds.includes(item.id);
  const isSaved = savedIds.includes(item.id);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimating('like');
    likeContent(item.id);
    setTimeout(() => setAnimating(null), 400);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAnimating('skip');
    skipContent(item.id);
    setTimeout(() => setAnimating(null), 400);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    isSaved ? unsaveContent(item.id) : saveContent(item.id);
  };

  if (isSkipped) return null;

  return (
    <div
      onClick={() => onOpen(item)}
      className={`bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200 ${
        animating === 'like' ? 'animate-pop' : ''
      }`}
    >
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
        {/* Save button */}
        <button
          onClick={handleSave}
          className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition ${
            isSaved ? 'bg-amber-400 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
          }`}
        >
          <span className="text-xs">{isSaved ? '★' : '☆'}</span>
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 leading-snug">{item.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{item.creatorName}</p>

        {/* Tags preview */}
        <div className="flex gap-1 mt-2 overflow-hidden">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleLike}
            className={`flex-1 text-xs font-medium py-1.5 rounded-lg transition ${
              isLiked
                ? 'bg-primary-600 text-white'
                : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
            }`}
          >
            {isLiked ? 'Liked!' : 'Like'}
          </button>
          <button
            onClick={handleSkip}
            className="flex-1 text-xs font-medium py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
          >
            Not for me
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
