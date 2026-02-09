import { create } from 'zustand';
import type { ContentItem, ContentPlatform } from '@kidstream/shared/src/types';

interface FeedState {
  items: ContentItem[];
  loading: boolean;
  platformFilters: ContentPlatform[];
  cursor: string | null;
  setPlatformFilters: (platforms: ContentPlatform[]) => void;
  setItems: (items: ContentItem[]) => void;
  appendItems: (items: ContentItem[]) => void;
  setLoading: (loading: boolean) => void;
  setCursor: (cursor: string | null) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
  items: [],
  loading: false,
  platformFilters: ['youtube', 'youtube_shorts', 'instagram_reels', 'image'],
  cursor: null,

  setPlatformFilters: (platforms) => set({ platformFilters: platforms }),
  setItems: (items) => set({ items }),
  appendItems: (items) => set((s) => ({ items: [...s.items, ...items] })),
  setLoading: (loading) => set({ loading }),
  setCursor: (cursor) => set({ cursor }),
}));
