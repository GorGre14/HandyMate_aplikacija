import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function LoginMojster() {
  const [gsm, setGsm] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${config.API_BASE_URL}/api/mojstri/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gsm })
    });

    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem('vloga', 'mojster');
      localStorage.setItem('gsm', gsm);
      navigate('/tezave');
    } else {
      alert(data.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Prijava mojstra</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Vnesi GSM"
          value={gsm}
          onChange={(e) => setGsm(e.target.value)}
        />
        <br /><br />
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
}

export default LoginMojster;
