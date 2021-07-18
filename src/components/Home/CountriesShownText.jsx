import React from 'react';

const CountriesShownText = ({ currentCountries, countries, location }) => {
  return (
    <div className={`countries-shown ${location}`}>
      {(location === 'top' || currentCountries.length !== 0) && (
        <p className="countries-shown__text">
          Showing {currentCountries.length} of {countries.length} countries
        </p>
      )}
    </div>
  );
};

export default CountriesShownText;
