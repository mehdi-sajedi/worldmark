import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMoon } from 'react-icons/hi';
import { HiMoon } from 'react-icons/hi';

const Header = ({ darkMode, setDarkMode }) => {
  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);

    if (!darkMode) {
      document.body.classList.add('darkmode');
    } else if (darkMode) {
      document.body.classList.remove('darkmode');
    }

    localStorage.setItem('darkmode', JSON.stringify(darkMode));
  };

  return (
    <div className="header-container">
      <header className="header">
        <Link to="/">
          <h2 className="header__text">Worldmark</h2>
        </Link>
        <button className="header__theme-btn" onClick={toggleDarkMode}>
          <i className="header__theme-btn__icon">
            {darkMode ? <HiMoon /> : <HiOutlineMoon />}
          </i>
          <p className="header__theme-btn__text">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </p>
        </button>
      </header>
    </div>
  );
};

export default Header;
