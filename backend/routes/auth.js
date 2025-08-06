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

router.post('/register', (req, res) => {
  console.log('Register endpoint hit with data:', req.body);
  console.log('Environment variables:', {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_DATABASE: process.env.DB_DATABASE
  });
  
  const { ime, priimek, gsm, email, geslo, tip_racuna, strokovnosti } = req.body;
  const sql = 'INSERT INTO uporabniki (ime, priimek, gsm, email, geslo, tip_racuna, strokovnosti) VALUES ($1, $2, $3, $4, $5, $6, $7)';

  db.query(sql, [ime, priimek, gsm, email, geslo, tip_racuna, JSON.stringify(strokovnosti)], (err, result) => {
    if (err) {
      console.error('Database error details:', err);
      if (err.code === '23505') { // PostgreSQL unique violation
        return res.status(409).json({ message: 'Email že obstaja' });
      }
      return res.status(500).json({ message: 'Napaka pri registraciji: ' + err.message });
    }

    res.status(200).json({ message: 'Registracija uspešna' });
  });
});
router.post('/login', (req, res) => {
  const { email, geslo } = req.body;

  const sql = 'SELECT id, ime, priimek, tip_racuna FROM uporabniki WHERE email = $1 AND geslo = $2';
  db.query(sql, [email, geslo], (err, result) => {
    if (err) {
      console.error('Napaka pri poizvedbi za login:', err);
      return res.status(500).json({ message: 'Napaka na strežniku.' });
    }

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Napačen email ali geslo.' });
    }

    const user = result.rows[0];
    res.json(user);
  });
});


module.exports = router;
