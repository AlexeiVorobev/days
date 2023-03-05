import React from "react";

const Header = ({title}) => {
  
  return (
    <div className="header">
      <div className="header-title">{title}</div>
      <button className="icon-btn" id="loginBtn">
        Login
        <span className="material-symbols-outlined">login</span>
      </button>
    </div>
  );
};

export default Header;
