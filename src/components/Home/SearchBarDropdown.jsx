import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/app-context';
import SearchBarDropdownCountry from './SearchBarDropdownCountry';
import useComponentInvisible from '../../hooks/useComponentInvisible';

const SearchBarDropdown = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { ref } = useComponentInvisible('CLOSE-SEARCH-DROPDOWN');

  useEffect(() => {
    dispatch({ type: 'SEARCH-MATCHES' });
  }, [dispatch, appState.inputText]);

  return (
    <div
      ref={ref}
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
