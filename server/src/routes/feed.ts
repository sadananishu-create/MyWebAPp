import { Router } from 'express';
import type { ContentPlatform, FeedResponse, ApiResponse } from '@kidstream/shared/src/types.js';
import { aggregateContent } from '../services/aggregator/index.js';
import { deduplicateItems } from '../services/dedup/index.js';
import { filterSafeContent } from '../services/safety/index.js';
import { rankByPreference } from '../services/preference/index.js';

export const feedRouter = Router();

feedRouter.get('/', async (req, res) => {
  try {
    const kidProfileId = req.query.kidProfileId as string;
    const limit = Number(req.query.limit) || 20;
    const cursor = req.query.cursor as string | undefined;
    const platforms = req.query.platforms
      ? (req.query.platforms as string).split(',') as ContentPlatform[]
      : undefined;

    // 1. Aggregate content from all requested platforms
    const raw = await aggregateContent({ platforms, cursor, limit: limit * 2 });

    // 2. Deduplicate across platforms
    const unique = deduplicateItems(raw);

    // 3. Safety filter
    const safe = filterSafeContent(unique);

    // 4. Rank by kid's preferences
    const ranked = rankByPreference(safe, kidProfileId);

    // 5. Paginate
    const page = ranked.slice(0, limit);

    const response: ApiResponse<FeedResponse> = {
      success: true,
      data: {
        items: page,
        nextCursor: page.length === limit ? `cursor_${Date.now()}` : undefined,
        totalEstimate: ranked.length,
      },
    };

    res.json(response);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: { code: 'FEED_ERROR', message: 'Failed to fetch feed' },
    });
  }
});
