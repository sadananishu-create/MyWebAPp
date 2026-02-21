import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AgeGroup, ContentPlatform } from '@kidstream/shared/src/types';

interface UserState {
  onboarded: boolean;
  name: string;
  ageGroup: AgeGroup;
  interests: string[];
  blockedTopics: string[];
  platformFilters: ContentPlatform[];
  screenTimeLimit: number; // minutes per day
  parentPin: string;
  likedIds: string[];
  skippedIds: string[];
  watchedIds: string[];
  savedIds: string[];

  // Actions
  completeOnboarding: (name: string, ageGroup: AgeGroup, interests: string[]) => void;
  setName: (name: string) => void;
  setAgeGroup: (ageGroup: AgeGroup) => void;
  addInterest: (interest: string) => void;
  removeInterest: (interest: string) => void;
  toggleInterest: (interest: string) => void;
  setPlatformFilters: (platforms: ContentPlatform[]) => void;
  togglePlatform: (platform: ContentPlatform) => void;
  setBlockedTopics: (topics: string[]) => void;
  addBlockedTopic: (topic: string) => void;
  removeBlockedTopic: (topic: string) => void;
  setScreenTimeLimit: (minutes: number) => void;
  setParentPin: (pin: string) => void;
  likeContent: (id: string) => void;
  skipContent: (id: string) => void;
  saveContent: (id: string) => void;
  unsaveContent: (id: string) => void;
  markWatched: (id: string) => void;
  resetProfile: () => void;
}

export const ALL_TOPICS = [
  'Dinosaurs', 'Space', 'Animals', 'Drawing', 'Science',
  'Music', 'Cooking', 'Sports', 'LEGO', 'Coding',
  'Nature', 'Robots', 'History', 'Dance', 'Origami',
  'Math', 'Cars', 'Crafts', 'Gaming', 'Stories',
];

const initialState = {
  onboarded: false,
  name: '',
  ageGroup: '6-8' as AgeGroup,
  interests: [],
  blockedTopics: [],
  platformFilters: ['youtube', 'youtube_shorts', 'instagram_reels', 'image'] as ContentPlatform[],
  screenTimeLimit: 60,
  parentPin: '',
  likedIds: [],
  skippedIds: [],
  watchedIds: [],
  savedIds: [],
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,

      completeOnboarding: (name, ageGroup, interests) =>
        set({ onboarded: true, name, ageGroup, interests }),

      setName: (name) => set({ name }),
      setAgeGroup: (ageGroup) => set({ ageGroup }),

      addInterest: (interest) =>
        set((s) => ({
          interests: s.interests.includes(interest) ? s.interests : [...s.interests, interest],
        })),
      removeInterest: (interest) =>
        set((s) => ({ interests: s.interests.filter((i) => i !== interest) })),
      toggleInterest: (interest) =>
        set((s) => ({
          interests: s.interests.includes(interest)
            ? s.interests.filter((i) => i !== interest)
            : [...s.interests, interest],
        })),

      setPlatformFilters: (platforms) => set({ platformFilters: platforms }),
      togglePlatform: (platform) =>
        set((s) => ({
          platformFilters: s.platformFilters.includes(platform)
            ? s.platformFilters.filter((p) => p !== platform)
            : [...s.platformFilters, platform],
        })),

      setBlockedTopics: (topics) => set({ blockedTopics: topics }),
      addBlockedTopic: (topic) =>
        set((s) => ({
          blockedTopics: s.blockedTopics.includes(topic) ? s.blockedTopics : [...s.blockedTopics, topic],
        })),
      removeBlockedTopic: (topic) =>
        set((s) => ({ blockedTopics: s.blockedTopics.filter((t) => t !== topic) })),

      setScreenTimeLimit: (minutes) => set({ screenTimeLimit: minutes }),
      setParentPin: (pin) => set({ parentPin: pin }),

      likeContent: (id) =>
        set((s) => ({
          likedIds: s.likedIds.includes(id) ? s.likedIds : [...s.likedIds, id],
          skippedIds: s.skippedIds.filter((sid) => sid !== id),
        })),
      skipContent: (id) =>
        set((s) => ({
          skippedIds: s.skippedIds.includes(id) ? s.skippedIds : [...s.skippedIds, id],
          likedIds: s.likedIds.filter((lid) => lid !== id),
        })),
      saveContent: (id) =>
        set((s) => ({
          savedIds: s.savedIds.includes(id) ? s.savedIds : [...s.savedIds, id],
        })),
      unsaveContent: (id) =>
        set((s) => ({ savedIds: s.savedIds.filter((sid) => sid !== id) })),
      markWatched: (id) =>
        set((s) => ({
          watchedIds: s.watchedIds.includes(id) ? s.watchedIds : [...s.watchedIds, id],
        })),

      resetProfile: () => set(initialState),
    }),
    { name: 'kidstream-user' },
  ),
);
