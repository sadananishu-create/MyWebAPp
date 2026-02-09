import type { FeedRequest, FeedResponse, ApiResponse, KidProfile } from '@kidstream/shared/src/types';

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json: ApiResponse<T> = await res.json();
  if (!json.success || !json.data) {
    throw new Error(json.error?.message ?? 'Request failed');
  }
  return json.data;
}

export const api = {
  getFeed(params: FeedRequest): Promise<FeedResponse> {
    const qs = new URLSearchParams({
      kidProfileId: params.kidProfileId,
      ...(params.limit && { limit: String(params.limit) }),
      ...(params.cursor && { cursor: params.cursor }),
      ...(params.platforms && { platforms: params.platforms.join(',') }),
    });
    return request<FeedResponse>(`/feed?${qs}`);
  },

  getProfile(kidId: string): Promise<KidProfile> {
    return request<KidProfile>(`/kids/${kidId}`);
  },

  sendSignal(contentId: string, action: string): Promise<void> {
    return request('/signals', {
      method: 'POST',
      body: JSON.stringify({ contentId, action }),
    });
  },
};
