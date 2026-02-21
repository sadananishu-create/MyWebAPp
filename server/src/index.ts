import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { feedRouter } from './routes/feed.js';
import { kidsRouter } from './routes/kids.js';
import { signalsRouter } from './routes/signals.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/feed', feedRouter);
app.use('/api/kids', kidsRouter);
app.use('/api/signals', signalsRouter);

app.listen(PORT, () => {
  console.log(`KidStream API running on http://localhost:${PORT}`);
});
