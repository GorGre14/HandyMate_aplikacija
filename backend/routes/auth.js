const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

router.post('/register', (req, res) => {
  const { ime, priimek, gsm, email, geslo, tip_racuna, strokovnosti } = req.body;
  const sql = 'INSERT INTO uporabniki (ime, priimek, gsm, email, geslo, tip_racuna, strokovnosti) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [ime, priimek, gsm, email, geslo, tip_racuna, JSON.stringify(strokovnosti)], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('Email že obstaja');
      }
      console.error('Napaka pri registraciji:', err);
      return res.status(500).send('Napaka pri registraciji.');
    }

    res.status(200).send('Registracija uspešna');
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
