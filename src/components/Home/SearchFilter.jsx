import React from 'react';
// import DropdownItem from './DropdownItem';
// import useComponentInvisible from '../../hooks/useComponentInvisible';
import { HiSearch } from 'react-icons/hi';
// import { IoIosArrowDown } from 'react-icons/io';
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
    console.log(filterState.menuOpen);
  };

  const openCategory = (key) => {
    console.log(key);
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
        <h3>Filter</h3>
        <div className="filter-category">
          <p>Population</p>
          <BsArrowRight className="btn-open-category" onClick={openCategory} />
        </div>
        <div className="filter-category">
          <p>Region</p>
          <BsArrowRight className="btn-open-category" onClick={openCategory} />
        </div>
        <div className="filter-category">
          <p>Sub Region</p>
          <BsArrowRight className="btn-open-category" onClick={openCategory} />
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
