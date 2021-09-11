import React from 'react';
// import DropdownItem from './DropdownItem';
// import useComponentInvisible from '../../hooks/useComponentInvisible';
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
    dispatch({ type: 'TOGGLE-MENU' });
  };

  const toggleSubRegions = (region) => {
    dispatch({ type: 'TOGGLE-SUB-REGIONS', payload: region });
  };

  const testing = () => {
    console.log('checked');
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
              <div className="option">
                <div className="top-layer">
                  <input type="checkbox" id="africa" onChange={testing} />
                  <label htmlFor="africa">Africa</label>
                  <RiArrowDownSLine
                    className="dropdown"
                    onClick={() => toggleSubRegions('africa')}
                  />
                </div>
                <div
                  className={`bottom-layer ${
                    filterState.regions.africa.open ? 'sub-open' : undefined
                  }`}
                >
                  <div className="sub-option">
                    <input type="checkbox" id="afr-n" />
                    <label htmlFor="afr-n">Northern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="afr-s" />
                    <label htmlFor="afr-s">Southern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="afr-w" />
                    <label htmlFor="afr-w">Western</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="afr-e" />
                    <label htmlFor="afr-e">Eastern</label>
                  </div>
                  <div className="sub-option">
                    <input type="checkbox" id="afr-m" />
                    <label htmlFor="afr-m">Middle</label>
                  </div>
                </div>
              </div>

              <div className="option">
                <div className="top-layer">
                  <input type="checkbox" id="america" />
                  <label htmlFor="america">America</label>
                  <RiArrowDownSLine
                    className="dropdown"
                    onClick={() => toggleSubRegions('america')}
                  />
                </div>
                <div
                  className={`bottom-layer ${
                    filterState.regions.america.open ? 'sub-open' : undefined
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
                  <input type="checkbox" id="asia" />
                  <label htmlFor="asia">Asia</label>
                  <RiArrowDownSLine
                    className="dropdown"
                    onClick={() => toggleSubRegions('asia')}
                  />
                </div>
                <div
                  className={`bottom-layer ${
                    filterState.regions.asia.open ? 'sub-open' : undefined
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
                  <input type="checkbox" id="europe" />
                  <label htmlFor="europe">Europe</label>
                  <RiArrowDownSLine
                    className="dropdown"
                    onClick={() => toggleSubRegions('europe')}
                  />
                </div>
                <div
                  className={`bottom-layer ${
                    filterState.regions.europe.open ? 'sub-open' : undefined
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
                  <input type="checkbox" id="oceania" />
                  <label htmlFor="oceania">Oceania</label>
                  <RiArrowDownSLine
                    className="dropdown"
                    onClick={() => toggleSubRegions('oceania')}
                  />
                </div>
                <div
                  className={`bottom-layer ${
                    filterState.regions.oceania.open ? 'sub-open' : undefined
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
