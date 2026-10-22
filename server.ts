import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { INITIAL_SERVICES } from './src/data/servicesData.js';
import { processAssistantQuery } from './src/data/assistantEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // API Route: Get initial services matrix
  app.get('/api/services', (_req, res) => {
    res.json({ success: true, count: INITIAL_SERVICES.length, data: INITIAL_SERVICES });
  });

  // API Route: Autonomous Quality Assistant for QSSA Services (Zero external dependencies)
  app.post('/api/chat', (req, res) => {
    try {
      const { message } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'El mensaje no puede estar vacío.' });
      }

      const replyText = processAssistantQuery(message);
      return res.json({ text: replyText });
    } catch (error: any) {
      console.error('Error processing assistant query:', error);
      return res.status(500).json({ error: 'Error procesando la consulta del asistente.' });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
