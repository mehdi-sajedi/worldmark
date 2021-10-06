import React, { useContext, useRef } from 'react';
import SearchBarDropdown from './SearchBarDropdown';
import { HiSearch } from 'react-icons/hi';
import { AppContext } from '../../context/app-context';
import { RiCloseFill } from 'react-icons/ri';

const SearchBar = () => {
  const { appState, dispatch } = useContext(AppContext);
  const inputRef = useRef();

  // const matchBySearch = (country, alpha2Code, alpha3Code, val) => {
  //   return (
  //     matchByCountryIdentifier(country, val) ||
  //     matchByCountryIdentifier(alpha2Code, val) ||
  //     matchByCountryIdentifier(alpha3Code, val)
  //   );
  // };

  // const matchByCountryIdentifier = (countryIdentifier, val) => {
  //   return countryIdentifier.toLowerCase().includes(val.toLowerCase().trim());
  // };

  const countriesFilter = (e) => {
    dispatch({
      type: 'SET-SEARCH-TEXT',
      payload: e.target.value,
    });

    const timeout = setTimeout(() => {
      // const matches = appState.countries.filter((country) => {
      //   return matchBySearch(
      //     country.name,
      //     country.alpha2Code,
      //     country.alpha3Code,
      //     e.target.value
      //   );
      // });
      dispatch({ type: 'FILTER-BY-SEARCH' });
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const clearSearch = () => {
    dispatch({
      type: 'CLEAR-SEARCH',
      payload: inputRef.current,
    });
    dispatch({
      type: 'SET-SEARCH-TEXT',
      payload: '',
    });

    dispatch({ type: 'FILTER-BY-SEARCH' });
  };

  return (
    <div className="search-bar">
      <div className="search-bar__input">
        <SearchBarDropdown />
        <i className="search-bar__input__icon">
          <HiSearch />
        </i>
        <input
          className="search-bar__input__text"
          type="text"
          placeholder="Search for a country"
          onChange={(e) => countriesFilter(e)}
          value={appState.searchText}
          ref={inputRef}
        />
        <RiCloseFill
          onClick={clearSearch}
          className={`search-close-icon ${
            appState.searchText.length > 0 ? 'show-close' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default SearchBar;
