import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analyzeRepository } from './routes/analyzeRepo.js';
import { generateAIInsightsRoute } from './routes/generateAIInsights.js';
import os from 'os';

// Load environment variables
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.post('/api/analyze-repo', analyzeRepository);
app.post('/api/generate-ai-insights', generateAIInsightsRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Get local network IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && !alias.internal) {
        return alias.address;
      }
    }
  }
  return 'localhost';
}

app.listen(PORT, '0.0.0.0', () => {
  const localIP = getLocalIP();
  console.log(`🚀 Server is running!`);
  console.log(`📍 Local:    http://localhost:${PORT}`);
  console.log(`📱 Network:  http://${localIP}:${PORT}`);
  console.log(`📊 Health:   http://localhost:${PORT}/api/health`);
});
