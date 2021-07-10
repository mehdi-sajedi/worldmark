import React from 'react';

const NumCountriesDisplayed = ({ countriesDisplayed, countries }) => {
  return (
    <div className="countries-displayed">
      <p className="countries-displayed__text">
        Showing {countriesDisplayed} of {countries.length} countries
      </p>
    </div>
  );
};

export default NumCountriesDisplayed;
