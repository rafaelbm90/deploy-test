import { Link } from "@remix-run/react";
import React from "react";

function NavBar() {
  return (
    <div className="nav-container">
      <div className="nav-bar">
        <div className="filler1"></div>
        <div className="nav-bar-center">
          <Link to="/" className="text-lg nav-bar-option nav-bar-home">
            Home
          </Link>
          <Link to="/latest" className="text-lg nav-bar-option nav-bar-latest">
            Latest
          </Link>
          <Link to="/about" className="text-lg nav-bar-option nav-bar-about">
            About
          </Link>
          <Link to="/new" className="text-lg nav-bar-option nav-bar-new">
            New
          </Link>
        </div>
        <div className="filler2"></div>
      </div>
    </div>
  );
}

export default NavBar;
