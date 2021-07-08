import React from 'react';
import { HiOutlineMoon } from 'react-icons/hi';
import { HiMoon } from 'react-icons/hi';
// import { IoIosSunny } from 'react-icons/io';

const Header = ({ toggleDarkMode, darkMode }) => {
  return (
    <div className="container">
      <header className="header">
        <h2 className="header__text">Where in the world?</h2>
        <div className="header__theme-btn" onClick={toggleDarkMode}>
          <i className="header__theme-btn__icon">
            {darkMode ? <HiMoon /> : <HiOutlineMoon />}
          </i>
          <p className="header__theme-btn__text weight-600">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </p>
        </div>
      </header>
    </div>
  );
};

export default Header;
