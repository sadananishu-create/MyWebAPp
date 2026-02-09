import { Router } from 'express';
import type { PreferenceSignal, ApiResponse } from '@kidstream/shared/src/types.js';

export const signalsRouter = Router();

signalsRouter.post('/', (req, res) => {
  const { contentId, action } = req.body;

  if (!contentId || !action) {
    res.status(400).json({
      success: false,
      error: { code: 'INVALID_INPUT', message: 'contentId and action are required' },
    } satisfies ApiResponse<never>);
    return;
  }

  // TODO: persist signal to DB and update preference model
  const signal: PreferenceSignal = {
    kidProfileId: 'kid-1', // will come from auth context
    contentId,
    action,
    timestamp: new Date().toISOString(),
  };

  console.log('Signal received:', signal);

  res.json({ success: true, data: signal } satisfies ApiResponse<PreferenceSignal>);
});
