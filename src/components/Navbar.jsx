import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Chris. Nolan</Link>
      
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`nav-links ${isOpen ? 'show-mobile' : ''}`} onClick={() => setIsOpen(false)}>
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About</Link>
        <Link to="/movies" className={location.pathname.startsWith('/movies') ? 'active' : ''}>Filmography</Link>
        <Link to="/imax" className={location.pathname === '/imax' ? 'active' : ''}>IMAX</Link>
      </div>
    </nav>
  );
};

export default Navbar;
