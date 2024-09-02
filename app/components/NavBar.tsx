import { Link } from "@remix-run/react";
import React from "react";

function NavBar() {
  return (
    <div className="nav-bar">
      <Link to="/" className="nav-bar-option nav-bar-home">
        Home
      </Link>
      <Link to="/latest" className="nav-bar-option nav-bar-latest">
        Latest
      </Link>
      <Link to="/about" className="nav-bar-option nav-bar-about">
        About
      </Link>
    </div>
  );
}

export default NavBar;
