const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { initializeCronJobs } = require('./cronJobs');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, 'https://bazaarsetu.vercel.app', 'https://bazaarsetu.netlify.app']
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/group-orders', require('./routes/groupOrders'));
app.use('/api/products', require('./routes/products'));
app.use('/api/supplier', require('./routes/supplier'));
app.use('/api/vendor', require('./routes/vendor'));
app.use('/api/prices', require('./routes/prices'));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Marketplace API is running!',
    features: [
      'Authentication System',
      'Group Orders Management',
      'Product Listings',
      'Supplier Dashboard',
      'Real-time Mandi Prices',
      'Google Maps Integration'
    ],
    version: '1.0.0'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  
  // Initialize cron jobs for mandi price updates
  initializeCronJobs();
});