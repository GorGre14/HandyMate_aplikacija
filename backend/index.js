const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();

// Configure CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://handymateapp-main.vercel.app', 'https://your-custom-domain.com'] // Add your actual Vercel domain
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());


const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
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


const PORT = process.env.PORT || 5000;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app;
