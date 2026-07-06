import express from 'express';
import './config/database';
import apiRoutes from './routes';

export const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', apiUrl: getApiBaseUrl() });
});

export function startServer() {
  const port = Number(process.env.PORT || 8000);

  return app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit backend listening on port ${port}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
}

if (require.main === module) {
  startServer();
}

export default app;
