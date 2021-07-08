import React from 'react';
import Country from './Country';

// Homepage - name, flag, population, region, capital
// Details Page -  ... + nativeName, subRegion, currencies, languages, borders, topLevelDomain

const Countries = ({ filteredCountries }) => {
  return (
    <div className="container">
      <section className="countries">
        {filteredCountries.map((country, idx) => (
          <Country key={idx} {...country} />
        ))}
      </section>
    </div>
  );
};

export default Countries;
