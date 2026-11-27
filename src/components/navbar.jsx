
import React from 'react';

function Navbar({ onAdminClick }) {

  return (
    <nav className="navbar">

      <h2 className="logo">
        Spice Garden
      </h2>

      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#menu">Menu</a></li>
        <li><a href="#reviews">Reviews</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <button
        type="button"
        className="admin-link"
        onClick={onAdminClick}
      >
        Admin
      </button>

    </nav>
  );
}

export default Navbar;
