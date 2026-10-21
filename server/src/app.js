const express = require('express');
const cors = require('cors');
const { CLIENT_URL } = require('./config/env');

const careerRoutes = require('./routes/careerRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const aiRoutes = require('./routes/aiRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// CORS configuration (Permissive for local dev & handles Vercel previews)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      // Allow localhost or any vercel.app preview or matching CLIENT_URL
      if (
        origin.includes('localhost') ||
        origin.includes('127.0.0.1') ||
        origin.endsWith('.vercel.app') ||
        CLIENT_URL === '*' ||
        CLIENT_URL === origin
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for production ease
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check Endpoint (Render checks this during deployment)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'SahiChayan Advisory API v2.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/careers', careerRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/users', userRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;

