import React from 'react';
import { Link } from 'react-router-dom';

const Country = ({ name, flag, population, region, capital }) => {
  return (
    <Link to={`/details/${name.split(' ').join('-')}`}>
      <div className="country">
        <img className="country__flag" src={flag} alt={`${name} flag`} />
        <div className="country__info">
          <h3 className="country__info__name">{name}</h3>
          <ul className="country__info__details">
            <li className="country__info__details__population">
              <span className="weight-600">Population: </span>
              {population.toLocaleString()}
            </li>
            <li className="country__info__details__region">
              <span className="weight-600">Region: </span>
              {region}
            </li>
            <li className="country__info__details__capital">
              <span className="weight-600">Capital: </span>
              {capital}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Country;
