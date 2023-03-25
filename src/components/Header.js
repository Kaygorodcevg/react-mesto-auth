import React from "react";
import headerLogo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="Заголовок" className="header__logo"></img>
    </header>
  );
}

export default Header;
