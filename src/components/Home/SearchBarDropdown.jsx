import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../context/app-context';
import SearchBarDropdownCountry from './SearchBarDropdownCountry';
import useComponentInvisible from '../../hooks/useComponentInvisible';

const SearchBarDropdown = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { ref } = useComponentInvisible('CLOSE-SEARCHBAR-DROPDOWN');

  useEffect(() => {
    dispatch({ type: 'SET-ONLY-SEARCH-MATCHES' });
  }, [dispatch, appState.searchText]);

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
            name={country._name}
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
