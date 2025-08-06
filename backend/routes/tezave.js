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
router.post('/dodaj', (req, res) => {
  const { opis, kategorija, cena, uporabnik_id } = req.body;

  if (!opis || !kategorija || !cena || !uporabnik_id) {
    return res.status(400).json({ message: 'Vsi podatki morajo biti izpolnjeni!' });
  }

  const query = "INSERT INTO tezave (opis, kategorija, cena, uporabnik_id, datum) VALUES (?, ?, ?, ?, NOW())";
  db.query(query, [opis, kategorija, cena, uporabnik_id], (err, result) => {
    if (err) {
      console.error('Napaka pri dodajanju težave:', err);
      return res.status(500).json({ message: 'Napaka pri dodajanju težave' });
    }
    res.status(200).json({ message: 'Težava uspešno dodana!' });
  });
});

router.get('/vse', (req, res) => {
  const query = 'SELECT * FROM tezave';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Napaka pri pridobivanju težav:', err);
      return res.status(500).json({ message: 'Napaka pri pridobivanju težav' });
    }
    res.status(200).json(results);
  });
});
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT t.*, 
           u.ime AS uporabnik_ime,
           u.priimek AS uporabnik_priimek,
           u.gsm AS uporabnik_gsm,
           u.email AS uporabnik_email
    FROM tezave t
    JOIN uporabniki u ON t.uporabnik_id = u.id
    WHERE t.id = ?`;
    
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Napaka pri pridobivanju težave:', err);
      return res.status(500).json({ message: 'Napaka pri pridobivanju težave' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Težava ni bila najdena' });
    }
    res.status(200).json(results[0]);  
  });
});

module.exports = router;
