import express from 'express';
import './config/database';
import apiRoutes from './routes';
import { getApiBaseUrl } from './config/api';

export const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiUrl: getApiBaseUrl() });
});

export function startServer() {
  const PORT = Number(process.env.PORT || 8000);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OctoFit backend listening on port ${PORT}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
}
