import React from 'react';
import { HiSearch } from 'react-icons/hi';

const SearchFilter = ({
  countries,
  setFilteredCountries,
  inputText,
  setInputText,
  dropdown,
  setDropdown,
}) => {
  const handleInputFilter = (countryIdentifier, e) => {
    console.log(e.target.value);
    return countryIdentifier
      .toLowerCase()
      .includes(e.target.value.toLowerCase().trim());
  };

  const handleDropdownFilter = (countryRegion) => {
    if (dropdown === 'all') return true;
    return countryRegion.toLowerCase() === dropdown;
  };

  const inputFilter = (e) => {
    setInputText(e.target.value);
    setFilteredCountries(
      countries.filter((country) => {
        if (
          handleInputFilter(country.name, e) &&
          handleDropdownFilter(country.region)
        ) {
          return country;
        } else if (
          handleInputFilter(country.alpha2Code, e) &&
          handleDropdownFilter(country.region)
        ) {
          return country;
        } else if (
          handleInputFilter(country.alpha3Code, e) &&
          handleDropdownFilter(country.region)
        ) {
          return country;
        } else return null;
      })
    );
  };

  const dropdownFilter = function (e) {
    console.log(e.target);
    setFilteredCountries(
      countries.filter((country) => {
        setDropdown(e.target.value);
        if (e.target.value === 'all') return country;
        return country.region.toLowerCase() === e.target.value && country;
      })
    );
  };

  return (
    // <div className="container">
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
      <article>
        <select
          defaultValue="DEFAULT"
          className="search-filter__dropdown"
          onChange={dropdownFilter}
        >
          <option value="all">Show All</option>
          <option value="africa">Africa</option>
          <option value="DEFAULT" hidden disabled>
            Filter by Region
          </option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </article>
    </section>
    // </div>
  );
};

export default SearchFilter;
