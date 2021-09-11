import React from 'react';
// import DropdownItem from './DropdownItem';
// import useComponentInvisible from '../../hooks/useComponentInvisible';
import FilterRegion from './FilterRegion';
import { HiSearch } from 'react-icons/hi';
// import { IoIosArrowDown } from 'react-icons/io';
import { RiArrowDownSLine } from 'react-icons/ri';
import { BsFilterRight } from 'react-icons/bs';

// const dropdownOptions = [
//   'show all',
//   'africa',
//   'americas',
//   'asia',
//   'europe',
//   'oceania',
// ];

const SearchFilter = ({
  countries,
  setCurrentCountries,
  inputText,
  setInputText,
  dropdownText,
  setDropdownText,
  filterState,
  dispatch,
}) => {
  // const {
  //   ref: dropdownRef,
  //   isComponentInvisible: isDropdownInvisible,
  //   setIsComponentInvisible: setIsDropdownInvisible,
  // } = useComponentInvisible(true);

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

  const toggleSubRegionsMenu = (region) => {
    dispatch({ type: 'TOGGLE-SUB-REGIONS-MENU', payload: region });
  };

  const toggleRegionCheck = (idx) => {
    dispatch({ type: 'TOGGLE-REGION-CHECK', payload: idx });
  };

  const toggleSubRegionCheck = (details) => {
    dispatch({ type: 'TOGGLE-SUB-REGION-CHECK', payload: details });
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
        <BsFilterRight className="filter-icon" />
      </div>

      <div className={`filter-menu ${filterState.menuOpen && 'filter-open'}`}>
        <h3>Filter | Sort</h3>
        <div className="filter-categories">
          <div className="filter-category population">
            <p>Population</p>
            <input type="text" placeholder="Min" />
            <input type="text" placeholder="Max" />
          </div>
          <div className="filter-category region">
            <p>Region</p>
            <div className="options">
              <FilterRegion filterState={filterState} dispatch={dispatch} />
              <div className="option">
                <div className="top-layer">
                  <input
                    type="checkbox"
                    id="africa"
                    checked={filterState.regions['africa'].selected}
                    onChange={() => toggleRegionCheck('africa')}
                  />
                  <label htmlFor="africa">Africa</label>
                  <RiArrowDownSLine
                    className="dropdown"
                    onClick={() => toggleSubRegionsMenu('africa')}
                  />
                </div>
                <div
                  className={`bottom-layer ${
                    filterState.regions['africa'].expanded
                      ? 'sub-open'
                      : undefined
                  }`}
                >
                  <div className="sub-option">
                    <input
                      type="checkbox"
                      id="af-n"
                      checked={filterState.regions['africa'].subRegions['af_n']}
                      onChange={() => toggleSubRegionCheck(['africa', 'af_n'])}
                    />
                    <label htmlFor="af-n">Northern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="af-s" />
                    <label htmlFor="af-s">Southern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="af-w" />
                    <label htmlFor="af-w">Western</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="af-e" />
                    <label htmlFor="af-e">Eastern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="af-m" />
                    <label htmlFor="af-m">Middle</label>
                  </div>
                </div>
              </div>

              <div className="option">
                <div className="top-layer">
                  <input
                    type="checkbox"
                    id="america"
                    checked={filterState.regions.america.selected}
                    onChange={() => toggleRegionCheck(1)}
                  />
                  <label htmlFor="america">America</label>
                  <RiArrowDownSLine
                    className="dropdown"
                    onClick={() => toggleSubRegionsMenu('america')}
                  />
                </div>
                <div
                  className={`bottom-layer ${
                    filterState.regions.america.expanded
                      ? 'sub-open'
                      : undefined
                  }`}
                >
                  <div className="sub-option">
                    <input type="checkbox" id="am-n" />
                    <label htmlFor="am-n">Northern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="am-s" />
                    <label htmlFor="am-s">Southern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="am-c" />
                    <label htmlFor="am-c">Central</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="caribbean" />
                    <label htmlFor="caribbean">Caribbean</label>
                  </div>
                </div>
              </div>

              <div className="option">
                <div className="top-layer">
                  <input
                    type="checkbox"
                    id="asia"
                    checked={filterState.regions.asia.selected}
                    onChange={() => toggleRegionCheck(2)}
                  />
                  <label htmlFor="asia">Asia</label>
                  <RiArrowDownSLine
                    className="dropdown"
                    onClick={() => toggleSubRegionsMenu('asia')}
                  />
                </div>
                <div
                  className={`bottom-layer ${
                    filterState.regions.asia.expanded ? 'sub-open' : undefined
                  }`}
                >
                  <div className="sub-option">
                    <input type="checkbox" id="as-w" />
                    <label htmlFor="as-w">Western</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="as-e" />
                    <label htmlFor="as-e">Eastern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="as-c" />
                    <label htmlFor="as-c">Central</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="as-s" />
                    <label htmlFor="as-s">Southern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="as-se" />
                    <label htmlFor="as-se">Southeastern</label>
                  </div>
                </div>
              </div>

              <div className="option">
                <div className="top-layer">
                  <input
                    type="checkbox"
                    id="europe"
                    checked={filterState.regions.europe.selected}
                    onChange={() => toggleRegionCheck(3)}
                  />
                  <label htmlFor="europe">Europe</label>
                  <RiArrowDownSLine
                    className="dropdown"
                    onClick={() => toggleSubRegionsMenu('europe')}
                  />
                </div>
                <div
                  className={`bottom-layer ${
                    filterState.regions.europe.expanded ? 'sub-open' : undefined
                  }`}
                >
                  <div className="sub-option">
                    <input type="checkbox" id="eur-n" />
                    <label htmlFor="eur-n">Northern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="eur-s" />
                    <label htmlFor="eur-s">Southern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="eur-w" />
                    <label htmlFor="eur-w">Western</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="eur-e" />
                    <label htmlFor="eur-e">Eastern</label>
                  </div>
                </div>
              </div>

              <div className="option">
                <div className="top-layer">
                  <input
                    type="checkbox"
                    id="oceania"
                    checked={filterState.regions.oceania.selected}
                    onChange={() => toggleRegionCheck(4)}
                  />
                  <label htmlFor="oceania">Oceania</label>
                  <RiArrowDownSLine
                    className="dropdown"
                    onClick={() => toggleSubRegionsMenu('oceania')}
                  />
                </div>
                <div
                  className={`bottom-layer ${
                    filterState.regions.oceania.expanded
                      ? 'sub-open'
                      : undefined
                  }`}
                >
                  <div className="sub-option">
                    <input type="checkbox" id="aus_nz" />
                    <label htmlFor="aus_nz">Australia & New Zealand</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="mel" />
                    <label htmlFor="mel">Melanesia</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="mic" />
                    <label htmlFor="mic">Micronesia</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="pol" />
                    <label htmlFor="pol">Polynesia</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
