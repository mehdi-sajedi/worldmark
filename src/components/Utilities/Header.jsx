import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { Link } from 'react-router-dom';
import { HiOutlineMoon } from 'react-icons/hi';
import { HiMoon } from 'react-icons/hi';

const Header = () => {
  const { appState, dispatch } = useContext(AppContext);

  return (
    <div className="header-container">
      <header className="header">
        <Link to="/">
          <h2 className="header__text">Where in the world?</h2>
        </Link>
        <div
          className="header__theme-btn"
          onClick={() => dispatch({ type: 'TOGGLE-DARK-MODE' })}
        >
          <i className="header__theme-btn__icon">
            {appState.darkMode ? <HiMoon /> : <HiOutlineMoon />}
          </i>
          <p className="header__theme-btn__text">
            {appState.darkMode ? 'Light Mode' : 'Dark Mode'}
          </p>
        </div>
      </header>
    </div>
  );
};

export default Header;
