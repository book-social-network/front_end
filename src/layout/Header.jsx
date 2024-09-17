import React from "react";
import Logo from "../assets/images/MeoAnhLongNgan.webp";
import "../css/header.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function Header() {
  return (
    <div className="d-flex align-items-center header-container">
      <div className=" d-flex col-3 align-items-center left-header">
          <img className="image-logo" src={Logo} alt="logo" />
        <div className="d-flex align-items-center justify-content-center search-icon">
        </div>
      </div>
      <div className="d-flex col-6 center-header">
      </div>
      <div className="d-flex col-3">
      </div>
    </div>
  );
}
export default Header;
