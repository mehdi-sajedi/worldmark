import React from 'react';

const NumCountriesShown = ({ currentCountries, countries, location }) => {
  return (
    <div className={`countries-shown ${location}`}>
      <p className="countries-shown__text">
        Showing {currentCountries.length} of {countries.length} countries
      </p>
    </div>
  );
};

export default NumCountriesShown;
