import React, { useContext, useRef } from 'react';
import SearchBarDropdown from './SearchBarDropdown';
import { HiSearch } from 'react-icons/hi';
import { AppContext } from '../../context/app-context';
import { RiCloseFill } from 'react-icons/ri';

const SearchFilter = () => {
  const { appState, dispatch } = useContext(AppContext);
  const inputRef = useRef();

  const matchBySearch = (country, alpha2Code, alpha3Code, val) => {
    return (
      matchByCountryIdentifier(country, val) ||
      matchByCountryIdentifier(alpha2Code, val) ||
      matchByCountryIdentifier(alpha3Code, val)
    );
  };

  const matchByCountryIdentifier = (countryIdentifier, val) => {
    return countryIdentifier.toLowerCase().includes(val.toLowerCase().trim());
  };

  const countriesFilter = (e) => {
    dispatch({
      type: 'SET-INPUT-TEXT',
      payload: { inputValue: e.target.value, inputRef: inputRef.current },
    });

    const timeout = setTimeout(() => {
      const matches = appState.countries.filter((country) => {
        return matchBySearch(
          country.name,
          country.alpha2Code,
          country.alpha3Code,
          e.target.value
        );
      });
      dispatch({ type: 'SET-CURRENT-COUNTRIES-MATCH', payload: matches });
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const clearSearch = (e) => {
    dispatch({ type: 'CLEAR-SEARCH', payload: inputRef.current });
    dispatch({
      type: 'SET-INPUT-TEXT',
      payload: { inputValue: '', inputRef: inputRef.current },
    });

    // const timeout = setTimeout(() => {
    dispatch({
      type: 'SET-CURRENT-COUNTRIES-MATCH',
      payload: appState.countries,
    });
    // }, 2000);

    // return () => clearTimeout(timeout);
  };

  return (
    <section className="search-filter">
      <div className="search-filter__input">
        <SearchBarDropdown />
        <i className="search-filter__input__icon">
          <HiSearch />
        </i>
        <input
          className="search-filter__input__text"
          type="text"
          placeholder="Search for a country"
          onChange={(e) => countriesFilter(e)}
          value={appState.inputText}
          ref={inputRef}
        />
        <RiCloseFill
          onClick={(e) => clearSearch(e)}
          className={`search-close-icon ${
            appState.inputText.length > 0 ? 'show-close' : ''
          }`}
        />
      </div>
    </section>
  );
};

export default SearchFilter;
