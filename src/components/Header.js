import React from 'react';
import { Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="Заголовок" className="header__logo"></img>
      <Link to="/sign-in" className="header__link">
        Войти
      </Link>
    </header>
  );
}

export default Header;
