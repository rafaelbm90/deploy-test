import { Link } from "@remix-run/react";
import React from "react";

function NavBar() {
  return (
    <div className="nav-bar">
      <div></div>
      <div className="nav-bar-center">
        <Link to="/" className="nav-bar-option nav-bar-home">
          Home
        </Link>
        <Link to="/latest" className="nav-bar-option nav-bar-latest">
          Latest
        </Link>
        <Link to="/about" className="nav-bar-option nav-bar-about">
          About
        </Link>
        <Link to="/new" className="nav-bar-option nav-bar-new">
          New
        </Link>
      </div>
      <div></div>
    </div>
  );
}

export default NavBar;
