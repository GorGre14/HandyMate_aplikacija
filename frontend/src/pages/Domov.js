import React from 'react';
import { useNavigate } from 'react-router-dom';

function Domov() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (user) {
    return (
      <div>
        <h2>Dobrodošel nazaj, {user.ime} {user.priimek}!</h2>
        <p>Prijavljen si kot: <strong>{user.tip_racuna}</strong></p>
        <button className='center-btn' onClick={handleLogout}>Odjava</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Dobrodošli v aplikaciji HandyMate</h2>
      <p>Izberi, kdo si:</p>
      <button className='center-btn' onClick={() => navigate('/register')}>Sem uporabnik</button>
      <button className='center-btn' onClick={() => navigate('/register')}>Sem mojster</button>
    </div>
  );
}

export default Domov;
