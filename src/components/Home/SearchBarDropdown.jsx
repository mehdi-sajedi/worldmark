import React, { useEffect, useContext, useRef, useCallback } from 'react';
import { AppContext } from '../../context/app-context';
import SearchBarDropdownCountry from './SearchBarDropdownCountry';

const SearchBarDropdown = () => {
  const { appState, dispatch } = useContext(AppContext);
  const searchDropdownRef = useRef(null);

  useEffect(() => {
    dispatch({ type: 'SEARCH-MATCHES' });
  }, [dispatch, appState.inputText]);

  const handleHideDropdown = useCallback(
    (e) => {
      if (e.key === 'Escape') dispatch({ type: 'CLOSE-SEARCH-DROPDOWN' });
    },
    [dispatch]
  );

  const handleClickOutside = useCallback(
    (e) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target)
      )
        dispatch({ type: 'CLOSE-SEARCH-DROPDOWN' });
    },
    [dispatch]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [handleHideDropdown, handleClickOutside]);

  return (
    <div
      ref={searchDropdownRef}
      className={`search-bar-dropdown ${
        appState.showSearchDropdown ? 'show-dropdown' : ''
      }`}
    >
      {appState.searchMatches.map((country, idx) => {
        return (
          <SearchBarDropdownCountry
            name={country.name}
            flag={country.flag}
            alpha3Code={country.alpha3Code}
            key={`Dropdown-${country.name}`}
            idx={idx}
          />
        );
      })}
    </div>
  );
};

export default SearchBarDropdown;
