import React from "react";
import { Link } from "react-router-dom";
import './navbar.css'; // Asegúrate de tener la ruta correcta

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/logo.svg" 
            alt="Logo"
            width="100"
            height="40"
            className="d-inline-block align-text-top"
          />
        </Link>

        <div className="navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/pokedex">
                Pokedex
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
