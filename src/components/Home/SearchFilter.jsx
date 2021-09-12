import React, { useContext } from 'react';
import FilterRegion from './FilterRegion';
import { HiSearch } from 'react-icons/hi';
import { IoFilter } from 'react-icons/io5';
import { AppContext } from '../../context/app-context';

const regions = ['africa', 'america', 'asia', 'europe', 'oceania'];

const SearchFilter = () => {
  const { filterState, dispatch, appState, dispatch2 } = useContext(AppContext);

  const countriesFilter = (e, from) => {
    let inputArg;

    if (from === 'search') {
      dispatch2({ type: 'SET-INPUT-TEXT', payload: e.target.value });
      inputArg = e.target.value;
    }

    const matches = appState.countries.filter((country) => {
      return matchBySearch(
        country.name,
        country.alpha2Code,
        country.alpha3Code,
        inputArg
      );
    });
    dispatch2({ type: 'SET-CURRENT-COUNTRIES-MATCH', payload: matches });
  };

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

  const toggleFilterMenu = () => {
    dispatch({ type: 'TOGGLE-FILTER-MENU' });
  };

  const sortPopulation = () => {
    const sortedCountries = appState.currentCountries.slice().sort((a, b) => {
      return b.population - a.population;
    });
    dispatch2({ type: 'SORT-POPULATION-DESCENDING', payload: sortedCountries });
  };

  return (
    <section className="search-filter">
      <div className="search-filter__input">
        <i className="search-filter__input__icon">
          <HiSearch />
        </i>
        <input
          className="search-filter__input__text"
          type="text"
          placeholder="Search for a country"
          onChange={(e) => countriesFilter(e, 'search')}
          value={appState.inputText}
        />
      </div>

      <div className="filter-wrapper" onClick={toggleFilterMenu}>
        <IoFilter className="filter-icon" />
      </div>

      <div className={`filter-menu ${filterState.menuOpen && 'filter-open'}`}>
        <h3>Filter | Sort</h3>
        <div className="filter-categories">
          <div className="filter-category population-category">
            <p className="population" onClick={sortPopulation}>
              Population
            </p>
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div>
          <div className="filter-category region-category">
            <p className="region">Region</p>
            <div className="options">
              {regions.map((region, idx) => {
                return <FilterRegion region={region} key={region} idx={idx} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
