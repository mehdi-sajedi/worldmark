import React from 'react';
import Country from './Country';

const Countries = ({ currentCountries }) => {
  return (
    <section
      className={`countries ${currentCountries.length <= 5 && 'snapper'}`}
    >
      {currentCountries.map((country, idx) => (
        <Country key={idx} {...country} />
      ))}
    </section>
  );
};

export default Countries;
