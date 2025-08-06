const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});


router.get('/', (req, res) => {
  const sql = 'SELECT ime, priimek, gsm, email, strokovnosti FROM uporabniki WHERE tip_racuna = $1';
  db.query(sql, ['mojster'], (err, result) => {
    if (err) {
      console.error('Napaka pri poizvedbi za mojstre:', err);
      return res.status(500).json({ error: 'Napaka pri pridobivanju mojstrov' });
    }
    res.json(result.rows);
  });
});

module.exports = router;
