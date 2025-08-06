const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

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

router.post('/register', (req, res) => {
  console.log('Register endpoint hit with data:', req.body);
  console.log('Environment variables:', {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_DATABASE: process.env.DB_DATABASE
  });
  
  const { ime, priimek, gsm, email, geslo, tip_racuna, strokovnosti } = req.body;
  const sql = 'INSERT INTO uporabniki (ime, priimek, gsm, email, geslo, tip_racuna, strokovnosti) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [ime, priimek, gsm, email, geslo, tip_racuna, JSON.stringify(strokovnosti)], (err, result) => {
    if (err) {
      console.error('Database error details:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email že obstaja' });
      }
      return res.status(500).json({ message: 'Napaka pri registraciji: ' + err.message });
    }

    res.status(200).json({ message: 'Registracija uspešna' });
  });
});
router.post('/login', (req, res) => {
  const { email, geslo } = req.body;

  const sql = 'SELECT id, ime, priimek, tip_racuna FROM uporabniki WHERE email = ? AND geslo = ?';
  db.query(sql, [email, geslo], (err, result) => {
    if (err) {
      console.error('Napaka pri poizvedbi za login:', err);
      return res.status(500).send('Napaka na strežniku.');
    }

    if (result.length === 0) {
      return res.status(401).send('Napačen email ali geslo.');
    }

    
    const user = result[0];
    res.json(user);
  });
});


module.exports = router;
