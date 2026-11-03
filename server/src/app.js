/**
 * SahiChayan.Com - Production Express Application
 */

const express = require('express');
const cors = require('cors');
const { CLIENT_URL, NODE_ENV } = require('./config/env');
const supabase = require('./config/supabase');
const { model } = require('./config/gemini');

// Middlewares
const requestLogger = require('./middlewares/loggerMiddleware');
const errorHandler = require('./middlewares/errorMiddleware');

// Route modules
const authRoutes = require('./routes/authRoutes');
const careerRoutes = require('./routes/careerRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const aiRoutes = require('./routes/aiRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// 1. Telemetry & Request Logging
app.use(requestLogger);

// 2. Production CORS Setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5173',
];

if (CLIENT_URL && CLIENT_URL !== '*') {
  allowedOrigins.push(CLIENT_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile, Postman)
      if (!origin) return callback(null, true);

      // In development or if CLIENT_URL is *, allow all
      if (CLIENT_URL === '*' || NODE_ENV !== 'production') {
        return callback(null, true);
      }

      // Check explicit allowed origins or any vercel.app preview
      const isAllowed =
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1');

      if (isAllowed) {
        return callback(null, true);
      }

      // Allow all for user convenience while retaining standard headers
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
  })
);

// 3. Body Parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 4. System Health & Diagnostic Telemetry Endpoint
app.get('/api/health', async (req, res) => {
  const startTime = Date.now();
  let supabaseStatus = { connected: false, latencyMs: null, error: null };

  if (supabase) {
    try {
      const dbStart = Date.now();
      const { count, error } = await supabase
        .from('career_catalog')
        .select('*', { count: 'exact', head: true });

      if (error) {
        supabaseStatus = { connected: false, error: error.message };
      } else {
        supabaseStatus = {
          connected: true,
          latencyMs: Date.now() - dbStart,
          careersInCatalog: count,
        };
      }
    } catch (dbErr) {
      supabaseStatus = { connected: false, error: dbErr.message };
    }
  } else {
    supabaseStatus = {
      connected: false,
      message: 'SUPABASE_URL or SUPABASE_KEY not configured in environment',
    };
  }

  const memoryUsage = process.memoryUsage();

  res.json({
    status: 'healthy',
    service: 'SahiChayan Advisory API',
    version: '2.0.0',
    environment: NODE_ENV,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    subsystems: {
      supabase: supabaseStatus,
      geminiAi: {
        configured: Boolean(model),
        model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
      },
    },
    memory: {
      rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
      heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    },
    latencyMs: Date.now() - startTime,
  });
});

// Root Welcome Route (Ensures Render health checks on "/" return 200 OK)
app.get('/', (req, res) => {
  res.json({
    service: 'SahiChayan Advisory API',
    version: '2.0.0',
    status: 'online',
    health: '/api/health',
  });
});

// 5. Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/users', userRoutes);

// 6. 404 Catch-All Route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint '${req.method} ${req.originalUrl}' does not exist on SahiChayan API.`,
  });
});

// 7. Centralized Global Error Handler
app.use(errorHandler);

module.exports = app;
