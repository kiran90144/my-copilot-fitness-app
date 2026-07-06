import express from 'express';
import './config/database';
import apiRoutes from './routes';

export const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/api/health', (_req, res) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const apiBaseUrl = codespaceName
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';

  res.json({ status: 'ok', apiUrl: apiBaseUrl });
});

export function startServer() {
  const PORT = Number(process.env.PORT || 8000);

  return app.listen(PORT, '0.0.0.0', () => {
    const codespaceName = process.env.CODESPACE_NAME;
    const apiBaseUrl = codespaceName
      ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
      : 'http://localhost:8000';

    console.log(`OctoFit backend listening on port ${PORT}`);
    console.log(`API base URL: ${apiBaseUrl}`);
  });
}

if (require.main === module) {
  startServer();
}
