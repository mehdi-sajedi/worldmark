import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import Country from './Country';

const CountriesGrid = () => {
  const { appState } = useContext(AppContext);

  return (
    <main
      className={`countries ${
        appState.currentPageCountries.length <= 5 ? 'snap' : ''
      }
        `}
    >
      {appState.currentPageCountries.map((country) => (
        <Country key={country.alpha3Code} {...country} />
      ))}
    </main>
  );
};

export default CountriesGrid;
