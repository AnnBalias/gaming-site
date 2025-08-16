// Example backend configuration for gaming site
// This shows how to properly configure CORS and other settings

import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 9998;

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:9998',
    'https://html5.gamemonetize.co',
    'https://gaming-site-alpha.vercel.app'
  ],
  credentials: false, // Set to true if you need cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Alternative: Allow all origins (less secure, but simpler)
// app.use(cors({ origin: "*" }));

// Serve static files
app.use(express.static(path.join(process.cwd(), 'dist')));

// API endpoints
app.get('/config', (req, res) => {
  res.json({
    meta: {
      title: "CyberStrike Arena - Friday Night Funkin",
      description: "Пориньте у божевільні ритми та надзвичайні дуелі.",
      keywords: "Friday Night Funkin, ритм гра, музична гра"
    },
    // ... rest of your data.json content
  });
});

app.get('/data', (req, res) => {
  // Serve your data.json file
  res.sendFile(path.join(process.cwd(), 'src', 'data.json'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for gaming site`);
});

export default app;
