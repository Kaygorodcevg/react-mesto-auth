import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <img src={headerLogo} alt="Заголовок" className="header__logo"></img>
      {location.pathname === '/sign-up' ? (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      ) : (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
    </header>
  );
}

export default Header;
