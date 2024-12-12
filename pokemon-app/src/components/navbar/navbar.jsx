import React from "react";

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
       
        <a className="navbar-brand" href="/">
          <img
            src="/logo.svg" 
            alt="Logo"
            width="100"
            height="40"
            className="d-inline-block align-text-top"
          />
        </a>

        {/* Links de navegación */}
        <div className="navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#pokedex">
                Pokedex
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#favorites">
                Favorites
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
