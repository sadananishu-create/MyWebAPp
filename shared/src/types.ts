// ── Content Types ──────────────────────────────────────────

export type ContentPlatform = 'youtube' | 'youtube_shorts' | 'instagram_reels' | 'image';

export type ContentType = 'video' | 'short' | 'reel' | 'image';

export interface ContentItem {
  id: string;
  platform: ContentPlatform;
  type: ContentType;
  title: string;
  description: string;
  thumbnailUrl: string;
  sourceUrl: string;
  duration?: number;           // seconds, for video content
  creatorName: string;
  creatorAvatarUrl?: string;
  tags: string[];
  publishedAt: string;         // ISO date
  /** Internal score from preference engine (0-1) */
  relevanceScore?: number;
  /** Hash used for deduplication */
  contentHash?: string;
}

// ── User Types ─────────────────────────────────────────────

export type AgeGroup = '3-5' | '6-8' | '9-12';

export interface KidProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  ageGroup: AgeGroup;
  interests: string[];         // e.g. ["dinosaurs", "space", "drawing"]
  blockedTopics: string[];     // parent-set exclusions
  platformFilters: ContentPlatform[];  // which platforms to show
}

export interface ParentAccount {
  id: string;
  email: string;
  name: string;
  kids: KidProfile[];
  createdAt: string;
}

// ── Feed Types ─────────────────────────────────────────────

export interface FeedRequest {
  kidProfileId: string;
  platforms?: ContentPlatform[];
  cursor?: string;             // pagination
  limit?: number;
}

export interface FeedResponse {
  items: ContentItem[];
  nextCursor?: string;
  totalEstimate: number;
}

// ── Preference Types ───────────────────────────────────────

export interface PreferenceSignal {
  kidProfileId: string;
  contentId: string;
  action: 'view' | 'like' | 'skip' | 'watch_complete' | 'share';
  timestamp: string;
  durationWatched?: number;    // seconds
}

// ── Safety Types ───────────────────────────────────────────

export type SafetyRating = 'safe' | 'needs_review' | 'blocked';

export interface SafetyCheck {
  contentId: string;
  rating: SafetyRating;
  flags: string[];
  checkedAt: string;
}

// ── API Response Wrapper ───────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}
