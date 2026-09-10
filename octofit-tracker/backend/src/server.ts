import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes/index.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());
app.use('/api', apiRouter);

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-backend', apiBaseUrl });
});

if (process.env.NODE_ENV !== 'test') {
  connectDatabase()
    .then(() => {
      app.listen(port, () => {
        console.log(`OctoFit Tracker API listening on ${apiBaseUrl}`);
      });
    })
    .catch((error) => {
      console.error('Unable to start OctoFit Tracker API:', error);
      process.exit(1);
    });
}

export default app;
