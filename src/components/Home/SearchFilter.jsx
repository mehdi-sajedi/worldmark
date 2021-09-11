import React from 'react';
// import DropdownItem from './DropdownItem';
// import useComponentInvisible from '../../hooks/useComponentInvisible';
import { HiSearch } from 'react-icons/hi';
// import { IoIosArrowDown } from 'react-icons/io';
import { RiArrowDownSLine } from 'react-icons/ri';
import { BsFilterRight, BsArrowRight, BsArrowLeft } from 'react-icons/bs';

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
                    region="africa"
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
                  <RiArrowDownSLine className="dropdown" />
                </div>
              </div>
              <div className="option">
                <div className="top-layer">
                  <input type="checkbox" id="asia" />
                  <label htmlFor="asia">Asia</label>
                  <RiArrowDownSLine className="dropdown" />
                </div>
              </div>
              <div className="option">
                <div className="top-layer">
                  <input type="checkbox" id="europe" />
                  <label htmlFor="europe">Europe</label>
                  <RiArrowDownSLine className="dropdown" />
                </div>
              </div>
              <div className="option">
                <div className="top-layer">
                  <input type="checkbox" id="oceania" />
                  <label htmlFor="oceania">Oceania</label>
                  <RiArrowDownSLine className="dropdown" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div
        className="search-filter__dropdown"
        onClick={() => setIsDropdownInvisible((prevState) => !prevState)}
        ref={dropdownRef}
      >
        <div className="search-filter__dropdown__item">
          <p className="search-filter__dropdown__item__text">{dropdownText}</p>
          <span className="search-filter__dropdown__item__arrow">
            <IoIosArrowDown />
          </span>
        </div>
        <div
          className={`search-filter__dropdown__options ${
            isDropdownInvisible ? 'hidden' : ''
          }`}
          onClick={(e) => countriesFilter(e, 'dropdown')}
        >
          {dropdownOptions.map((country) => (
            <DropdownItem country={country} key={country} />
          ))}
        </div>
      </div> */}
    </section>
  );
};

export default SearchFilter;
