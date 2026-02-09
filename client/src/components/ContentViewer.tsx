import { useEffect } from 'react';
import type { ContentItem } from '@kidstream/shared/src/types';
import { useUserStore } from '../store/userStore';

interface ContentViewerProps {
  item: ContentItem;
  onClose: () => void;
}

const platformColors: Record<string, string> = {
  youtube: 'bg-red-500',
  youtube_shorts: 'bg-red-500',
  instagram_reels: 'bg-pink-500',
  image: 'bg-blue-500',
};

const platformLabels: Record<string, string> = {
  youtube: 'YouTube',
  youtube_shorts: 'YouTube Shorts',
  instagram_reels: 'Instagram Reels',
  image: 'Image',
};

export default function ContentViewer({ item, onClose }: ContentViewerProps) {
  const { likedIds, savedIds, likeContent, saveContent, unsaveContent, markWatched } = useUserStore();

  const isLiked = likedIds.includes(item.id);
  const isSaved = savedIds.includes(item.id);

  useEffect(() => {
    markWatched(item.id);
    // Prevent background scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [item.id, markWatched]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className={`text-[10px] text-white font-semibold px-2 py-0.5 rounded-full ${platformColors[item.platform] ?? 'bg-gray-500'}`}>
            {platformLabels[item.platform] ?? item.platform}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition"
          >
            X
          </button>
        </div>

        {/* Thumbnail / Preview */}
        <div className="relative aspect-video bg-gray-200">
          <img src={item.thumbnailUrl} alt={item.title} className="w-full h-full object-cover" />
          {item.duration != null && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-black/50 flex items-center justify-center">
                <div className="w-0 h-0 border-t-8 border-b-8 border-l-14 border-t-transparent border-b-transparent border-l-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Content Info */}
        <div className="p-4 space-y-4">
          <div>
            <h2 className="font-display text-lg font-bold leading-snug">{item.title}</h2>
            <p className="text-xs text-gray-500 mt-1">{item.creatorName}</p>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-primary-50 text-primary-600 font-medium">
                #{tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => likeContent(item.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                isLiked
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-50 text-primary-600 hover:bg-primary-100'
              }`}
            >
              {isLiked ? 'Liked!' : 'Like'}
            </button>
            <button
              onClick={() => (isSaved ? unsaveContent(item.id) : saveContent(item.id))}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                isSaved
                  ? 'bg-amber-500 text-white'
                  : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
              }`}
            >
              {isSaved ? 'Saved!' : 'Save'}
            </button>
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-center bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Open
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
