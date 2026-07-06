import express from 'express';
import './config/database';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend listening on port ${PORT}`);
});
