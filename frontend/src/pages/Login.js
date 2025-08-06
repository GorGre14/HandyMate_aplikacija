import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../config';

function Login() {
  const [email, setEmail] = useState('');
  const [geslo, setGeslo] = useState('');
  const [sporocilo, setSporocilo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${config.API_BASE_URL}/api/login`, {
        email,
        geslo,
      });

      
      localStorage.setItem('user', JSON.stringify(res.data));
      setSporocilo('Prijava uspešna!');
      navigate('/');
    } catch (err) {
      console.log("Login error:", err);
      setSporocilo('Napaka: napačen email ali geslo.');
    }
  };

  return (
    <div>
      <h2>Prijava</h2>
      <form  onSubmit={handleSubmit}>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Geslo"
          value={geslo}
          onChange={(e) => setGeslo(e.target.value)}
          required
        /><br />
        <button  type="submit">Prijavi se</button>
      </form>
      <p>{sporocilo}</p>
    </div>
  );
}

export default Login;
