import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/app-context';
import SearchBarDropdownCountry from './SearchBarDropdownCountry';

const SearchBarDropdown = () => {
  const { appState, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'SEARCH-MATCHES' });
  }, [dispatch, appState.inputText]);

  return (
    <div
      className={`search-bar-dropdown ${
        appState.searchActive ? 'show-dropdown' : ''
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
