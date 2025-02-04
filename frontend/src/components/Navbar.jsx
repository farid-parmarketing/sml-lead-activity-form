import React from "react";
import sml_logo from "../assets/images/sml logo.png";

const Navbar = () => {
  return (
    <div className="row align-items-center justify-content-center gap-4 m-0 mb-2">
      <nav className="col-md-6 glass p-2">
        <div className="logo">
          <img src={sml_logo} alt="sml_logo" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
