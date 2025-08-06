const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

// Configure CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['http://88.200.63.148', 'http://88.200.63.148:3000', 'http://88.200.63.148:80', 'http://localhost:3000'] // University server
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());


const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


// Import routes
const authRoutes = require('./routes/auth');
const mojstriRoutes = require('./routes/mojstri');
const tezaveRoutes = require('./routes/tezave');

// Use routes
app.use('/api', authRoutes);
app.use('/api/mojstri', mojstriRoutes);
app.use('/api/tezave', tezaveRoutes);

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend deluje in je povezan z bazo!' });
});

// Database connection test endpoint
app.get('/api/test-db', (req, res) => {
  console.log('Testing database connection...');
  console.log('Environment variables:', {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_DATABASE: process.env.DB_DATABASE,
    NODE_ENV: process.env.NODE_ENV
  });

  // Test simple query for PostgreSQL
  db.query('SELECT 1 as test', (err, results) => {
    if (err) {
      console.error('Database connection error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Database connection failed',
        error: err.message,
        code: err.code
      });
    }
    
    console.log('Database connection successful:', results.rows);
    res.json({ 
      success: true, 
      message: 'PostgreSQL connection working!',
      result: results.rows[0]
    });
  });
});


const PORT = process.env.PORT || 5000;

// Start server (traditional deployment)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}/api/test`);
});
