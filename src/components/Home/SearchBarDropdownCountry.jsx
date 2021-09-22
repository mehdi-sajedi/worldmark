import React from 'react';
import { Link } from 'react-router-dom';

const SearchBarDropdownCountry = ({ name, flag, alpha3Code }) => {
  return (
    <Link to={`/details/${alpha3Code}`} className="dropdown-country">
      <img className="country-flag" src={flag} alt="" />
      <p className="country-name">{name}</p>
    </Link>
  );
};

export default SearchBarDropdownCountry;
