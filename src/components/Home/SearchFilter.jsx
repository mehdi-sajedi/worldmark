import React, { useEffect, useState, useRef } from 'react';
import DropdownItem from './DropdownItem';
import { HiSearch } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';

// prettier-ignore
const dropdownOptions = [
  'show all',
  'africa',
  'americas',
  'asia',
  'europe',
  'oceania',
];

const SearchFilter = ({
  countries,
  setCurrentCountries,
  inputText,
  setInputText,
  dropdown,
  setDropdown,
}) => {
  const [hideDropdown, setHideDropdown] = useState(true);
  const dropdownButtonRef = useRef();
  const dropdownOptionsContainerRef = useRef();

  useEffect(() => {
    const x = document.addEventListener('mousedown', (e) => {
      if (e.target.closest('.search-filter__dropdown')) {
        setHideDropdown((prevState) => !prevState);
      } else if (e.target.parentNode !== dropdownOptionsContainerRef.current) {
        setHideDropdown(true);
      }
    });
    return () => {
      document.removeEventListener('mousedown', x);
    };
  }, []);

  const countriesFilter = (e, from) => {
    let dropdownArg, inputArg;

    if (from === 'dropdown') {
      setDropdown(e.target.dataset.value);
      dropdownArg = e.target.dataset.value;
      inputArg = inputText;
    }
    if (from === 'search') {
      setInputText(e.target.value);
      dropdownArg = dropdown;
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
    if (val === 'show all' || val === 'Filter by region') return true;
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

      <div className="search-filter__dropdown">
        <div
          className="search-filter__dropdown__item"
          // onClick={toggleDropdown}
          ref={dropdownButtonRef}
        >
          <p className="search-filter__dropdown__item__text ">{dropdown}</p>
          <IoIosArrowDown />
        </div>
        <div
          className={`search-filter__dropdown__options ${
            hideDropdown && 'hide-dropdown'
          }`}
          onClick={(e) => countriesFilter(e, 'dropdown')}
          ref={dropdownOptionsContainerRef}
        >
          {dropdownOptions.map((country) => (
            <DropdownItem country={country} key={country} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
