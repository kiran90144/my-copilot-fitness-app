import express from 'express';
import './config/database';
import apiRoutes from './routes';
import { getApiBaseUrl } from './config/api';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiUrl: getApiBaseUrl() });
});

app.listen(PORT, () => {
  console.log(`OctoFit backend listening on port ${PORT}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});
