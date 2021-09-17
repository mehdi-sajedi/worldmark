import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import Country from './Country';

const Countries = () => {
  const { appState } = useContext(AppContext);

  return (
    <section
      className={`countries ${
        appState.currentCountries.length <= 5 ? 'snapper' : ''
      }
        `}
    >
      {appState.currentCountries.map((country) => (
        <Country key={country.alpha3Code} {...country} />
      ))}
    </section>
  );
};

export default Countries;
