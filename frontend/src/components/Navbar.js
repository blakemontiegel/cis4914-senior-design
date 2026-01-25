import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src={logo} alt="Sideline Logo" className="navbar-logo" />
          <span>Sideline</span>
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/"><i className="fas fa-home"></i></Link></li>
        <li><Link to="/profile"><i className="fas fa-user"></i></Link></li>
        <li><Link to="/login"><i className="fas fa-sign-in-alt"></i></Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
