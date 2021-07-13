import React, { useEffect, useState, useRef } from 'react';
import DropdownItem from './DropdownItem';
import { HiSearch } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';

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
  const dropdownRef = useRef();

  useEffect(() => {
    const x = document.addEventListener('mousedown', (e) => {
      if (e.target.parentNode !== dropdownRef.current) setHideDropdown(true);
    });
    return () => {
      document.removeEventListener('mousedown', x);
    };
  }, []);

  const toggleDropdown = () => {
    setHideDropdown((prevState) => !prevState);
  };

  const countriesFilter = (e, from) => {
    let dropdownArg, inputArg;

    if (from === 'dropdown') {
      setHideDropdown((prevState) => !prevState);
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

  const matchByCountryIdentifier = (countryIdentifier, val) => {
    return countryIdentifier.toLowerCase().includes(val.toLowerCase().trim());
  };

  const matchBySearch = (name, alpha2Code, alpha3Code, val) => {
    return (
      matchByCountryIdentifier(name, val) ||
      matchByCountryIdentifier(alpha2Code, val) ||
      matchByCountryIdentifier(alpha3Code, val)
    );
  };

  const matchByDropdown = (region, val) => {
    if (val === 'show all' || val === 'Filter by region') return true;
    return val === region.toLowerCase();
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
        <div className="search-filter__dropdown__item" onClick={toggleDropdown}>
          <p className="search-filter__dropdown__item__text ">{dropdown}</p>
          <IoIosArrowDown />
        </div>
        <div
          className={`search-filter__dropdown__options ${
            hideDropdown && 'hide-dropdown'
          }`}
          onClick={(e) => countriesFilter(e, 'dropdown')}
          ref={dropdownRef}
        >
          {dropdownOptions.map((country) => (
            <DropdownItem country={country} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;
