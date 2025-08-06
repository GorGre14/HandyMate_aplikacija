const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
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


const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000
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

  // Test simple query
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
    
    console.log('Database connection successful:', results);
    res.json({ 
      success: true, 
      message: 'Database connection working!',
      result: results[0]
    });
  });
});


const PORT = process.env.PORT || 5000;

// Start server (traditional deployment)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at: http://localhost:${PORT}/api/test`);
});
