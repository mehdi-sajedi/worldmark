import React, { useContext } from 'react';
import FilterRegion from './FilterRegion';
import { HiSearch } from 'react-icons/hi';
import { IoFilter } from 'react-icons/io5';
import { AppContext } from '../../context/app-context';

const regions = ['africa', 'america', 'asia', 'europe', 'oceania'];

const SearchFilter = ({
  countries,
  currentCountries,
  setCurrentCountries,
  inputText,
  setInputText,
  dropdownText,
  setDropdownText,
}) => {
  const { filterState, dispatch } = useContext(AppContext);

  const countriesFilter = (e, from) => {
    let dropdownArg, inputArg;

    if (from === 'dropdown') {
      setDropdownText(e.target.dataset.value);
      dropdownArg = e.target.dataset.value;
      inputArg = inputText;
    }
    if (from === 'search') {
      setInputText(e.target.value);
      dropdownArg = dropdownText;
      inputArg = e.target.value;
    }

    const matches = countries.filter((country) => {
      return (
        matchByDropdown(country.region, dropdownArg) &&
        matchBySearch(
          country.name,
          country.alpha2Code,
          country.alpha3Code,
          inputArg
        )
      );
    });
    setCurrentCountries(matches);
  };

  const matchByDropdown = (region, val) => {
    if (val === 'show all' || val === 'Filter by Region') return true;
    return val === region.toLowerCase();
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

  const sortCountries = () => {
    console.log(currentCountries);
    setCurrentCountries((country) => {
      return country.slice().sort((a, b) => {
        return b.population - a.population;
      });
    });
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
          value={inputText}
        />
      </div>

      <div className="filter-wrapper" onClick={toggleFilterMenu}>
        <IoFilter className="filter-icon" />
      </div>

      <div className={`filter-menu ${filterState.menuOpen && 'filter-open'}`}>
        <h3>Filter | Sort</h3>
        <div className="filter-categories">
          <div className="filter-category population-category">
            <p className="population" onClick={sortCountries}>
              Population
            </p>
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div>
          <div className="filter-category region-category">
            <p className="region">Region</p>
            <div className="options">
              {regions.map((region, idx) => {
                return (
                  <FilterRegion
                    // filterState={filterState}
                    // dispatch={dispatch}
                    region={region}
                    key={region}
                    idx={idx}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
