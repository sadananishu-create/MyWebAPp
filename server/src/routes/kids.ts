import { Router } from 'express';
import type { KidProfile, ApiResponse } from '@kidstream/shared/src/types.js';

export const kidsRouter = Router();

// Mock data — will be replaced with DB queries
const mockProfiles: KidProfile[] = [
  {
    id: 'kid-1',
    name: 'Alex',
    ageGroup: '6-8',
    interests: ['dinosaurs', 'space', 'drawing', 'lego'],
    blockedTopics: [],
    platformFilters: ['youtube', 'youtube_shorts', 'instagram_reels', 'image'],
  },
];

kidsRouter.get('/:id', (req, res) => {
  const profile = mockProfiles.find((p) => p.id === req.params.id);
  if (!profile) {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Kid profile not found' },
    } satisfies ApiResponse<never>);
    return;
  }
  res.json({ success: true, data: profile } satisfies ApiResponse<KidProfile>);
});
