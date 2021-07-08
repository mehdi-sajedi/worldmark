import React from 'react';
import { HiSearch } from 'react-icons/hi';

const SearchFilter = ({
  countries,
  setFilteredCountries,
  inputText,
  setInputText,
}) => {
  const inputFilter = (e) => {
    setInputText(e.target.value);
    setFilteredCountries(
      countries.filter((country) => {
        return (
          (country &&
            country.name
              .toLowerCase()
              .includes(e.target.value.toLowerCase().trim())) ||
          country.alpha2Code
            .toLowerCase()
            .includes(e.target.value.toLowerCase().trim()) ||
          country.alpha3Code
            .toLowerCase()
            .includes(e.target.value.toLowerCase().trim())
        );
      })
    );
  };

  const dropdownFilter = (e) => {
    setFilteredCountries(
      countries.filter((country) => {
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
