const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


router.get('/', (req, res) => {
  const sql = 'SELECT ime, priimek, gsm, email, strokovnosti FROM uporabniki WHERE tip_racuna = "mojster"';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Napaka pri poizvedbi za mojstre:', err);
      return res.status(500).json({ error: 'Napaka pri pridobivanju mojstrov' });
    }
    res.json(result);
  });
});

module.exports = router;
