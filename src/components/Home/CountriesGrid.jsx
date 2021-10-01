import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import Country from './Country';

const CountriesGrid = () => {
  const { appState } = useContext(AppContext);

  return (
    <section
      className={`countries ${
        appState.currentPageCountries.length <= 5 ? 'snapper' : ''
      }
        `}
    >
      {appState.currentPageCountries.map((country) => (
        <Country key={country.alpha3Code} {...country} />
      ))}
    </section>
  );
};

export default CountriesGrid;
