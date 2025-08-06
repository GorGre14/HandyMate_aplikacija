import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <div>
        <Link to="/" style={{ fontWeight: 'bold', fontSize: '20px', textDecoration: 'none', color: 'purple' }}>
          HandyMate
        </Link>
      </div>
      <div>
        {!user && (
          <>
            <Link to="/login" style={{ marginRight: '10px' }}>Prijava</Link>
            <Link to="/register">Registracija</Link>
          </>
        )}

        {user && user.tip_racuna === 'uporabnik' && (
          <>
            <Link to="/dodaj-tezavo" style={{ marginRight: '10px' }}>Dodaj težavo</Link>
            <Link to="/tezave" style={{ marginRight: '10px' }}>Težave</Link>
            <Link to="/mojstri" style={{ marginRight: '10px' }}>Mojstri</Link>
            <span style={{ marginRight: '10px' }}>Pozdravljen, {user.ime}</span>
            <button onClick={handleLogout}>Odjava</button>
          </>
        )}

        {user && user.tip_racuna === 'mojster' && (
          <>
            <Link to="/tezave" style={{ marginRight: '10px' }}>Težave</Link>
            <Link to="/mojstri" style={{ marginRight: '10px' }}>Mojstri</Link>
            <span style={{ marginRight: '10px' }}>Pozdravljen, {user.ime}</span>
            <button onClick={handleLogout}>Odjava</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
