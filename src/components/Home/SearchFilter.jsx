import React, { useEffect, useContext } from 'react';
import FilterRegion from './FilterRegion';
import { HiSearch } from 'react-icons/hi';
// import { IoFilter } from 'react-icons/io5';
import { AppContext } from '../../context/app-context';
import { BiSlider } from 'react-icons/bi';

const regions = ['africa', 'americas', 'asia', 'europe', 'oceania'];

const SearchFilter = () => {
  const { appState, dispatch } = useContext(AppContext);

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

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     // if (appState.inputText !== '') {
  //     countriesFilter(appState.inputText);
  //     // }
  //   }, 7500);
  //   return () => clearTimeout(timeout);
  // }, [appState.inputText]);

  const countriesFilter = (e, from) => {
    // let inputArg;

    // if (from === 'search') {
    dispatch({ type: 'SET-INPUT-TEXT', payload: e.target.value });
    // dispatch({ type: 'SET-INPUT-TEXT', payload: e });
    // inputArg = e.target.value;
    // }

    setTimeout(() => {
      const matches = appState.countries.filter((country) => {
        return matchBySearch(
          country.name,
          country.alpha2Code,
          country.alpha3Code,
          // e
          e.target.value
          // inputArg
        );
      });
      dispatch({ type: 'SET-CURRENT-COUNTRIES-MATCH', payload: matches });
    }, 250);
  };

  const toggleFilterMenu = () => {
    dispatch({ type: 'TOGGLE-FILTER-MENU' });
  };

  // const sortPopulation = () => {
  //   const sortedCountries = appState.currentCountries.slice().sort((a, b) => {
  //     return b.population - a.population;
  //   });
  //   dispatch({ type: 'SORT-POPULATION-DESCENDING', payload: sortedCountries });
  // };

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
          // onChange={(e) =>
          //   dispatch({ type: 'SET-INPUT-TEXT', payload: e.target.value })
          // }
          value={appState.inputText}
        />
      </div>

      <div className="filter-wrapper" onClick={toggleFilterMenu}>
        <BiSlider className="filter-icon" />
      </div>

      <div className={`filter-menu ${appState.menuOpen && 'filter-open'}`}>
        <h3>Filter | Sort</h3>
        <div className="filter-categories">
          {/* <div className="filter-category population-category">
            <p className="population" onClick={sortPopulation}>
              Population
            </p>
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div> */}
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
