import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{
        width: "40%", 
        backgroundColor: "white", 
        border: "1px solid grey",
        borderRadius: "35px", 
        margin: "0 auto"
      }}
    >
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