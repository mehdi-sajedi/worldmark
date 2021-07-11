import React from 'react';
import { HiSearch } from 'react-icons/hi';

const SearchFilter = ({
  countries,
  setCurrentCountries,
  inputText,
  setInputText,
  dropdown,
  setDropdown,
}) => {
  const inputFilter = (e) => {
    setInputText(e.target.value);
    const matches = countries.filter((country) => {
      return (
        matchByDropdown(country.region, dropdown) &&
        matchByInput(
          country.name,
          country.alpha2Code,
          country.alpha3Code,
          e.target.value
        )
      );
    });
    setCurrentCountries(matches);
  };

  const dropdownFilter = (e) => {
    setDropdown(e.target.value);
    const matches = countries.filter((country) => {
      return (
        matchByDropdown(country.region, e.target.value) &&
        matchByInput(
          country.name,
          country.alpha2Code,
          country.alpha3Code,
          inputText
        )
      );
    });
    setCurrentCountries(matches);
  };

  const matchByCountryIdentifier = (countryIdentifier, val) => {
    return countryIdentifier.toLowerCase().includes(val.toLowerCase().trim());
  };

  const matchByInput = (name, alpha2Code, alpha3Code, val) => {
    return (
      matchByCountryIdentifier(name, val) ||
      matchByCountryIdentifier(alpha2Code, val) ||
      matchByCountryIdentifier(alpha3Code, val)
    );
  };

  const matchByDropdown = (region, val) => {
    if (val === 'all' || val === 'DEFAULT') return true;
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
          onChange={inputFilter}
          value={inputText}
        />
      </div>
      <div>
        <select
          className="search-filter__dropdown"
          onChange={dropdownFilter}
          value={dropdown}
        >
          <option value="DEFAULT" hidden disabled>
            Filter by Region
          </option>
          <option value="all">Show All</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};

export default SearchFilter;
