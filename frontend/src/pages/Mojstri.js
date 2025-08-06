import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';

function Mojstri() {
  const [mojstri, setMojstri] = useState([]);

  useEffect(() => {
    axios.get(`${config.API_BASE_URL}/api/mojstri`)
      .then(res => setMojstri(res.data))
      .catch(err => console.error('Napaka pri pridobivanju mojstrov:', err));
  }, []);

  return (
    <div>
      <h2>Seznam mojstrov</h2>
      <ul>
        {mojstri.map((mojster, index) => (
          <li key={index}>
            <strong>{mojster.ime} {mojster.priimek}</strong> {}
            – {mojster.strokovnosti?.join(', ') || 'Brez strokovnosti'}, GSM: {mojster.gsm}, Email: {mojster.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Mojstri;
