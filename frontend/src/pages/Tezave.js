import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../config';

function SeznamTezav() {
  const [tezave, setTezave] = useState([]);

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/api/tezave/vse`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTezave(data);
        } else {
          console.error('API returned non-array data:', data);
          setTezave([]);
        }
      })
      .catch((err) => {
        console.error('Napaka pri pridobivanju težav:', err);
        setTezave([]);
      });
  }, []);

  return (
    <div>
      <h2>Seznam težav</h2>
      <div className="tezave-grid">
        {tezave.map((t) => (
          <div key={t.id} className="tezava-card">
            <div className="tezava-content">
              <h3 className="tezava-title">{t.kategorija}</h3>
              <p className="tezava-meta"><strong>Opis:</strong> {t.opis}</p>
              <p className="tezava-meta"><strong>Cena:</strong> {t.cena} €</p>
            </div>
            <Link to={`/tezave/${t.id}`} className="btn-details">Podrobnosti</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeznamTezav;
