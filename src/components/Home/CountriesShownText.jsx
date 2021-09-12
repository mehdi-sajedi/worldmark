import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';

const CountriesShownText = ({ location }) => {
  const { appState } = useContext(AppContext);

  return (
    <div className={`countries-shown ${location}`}>
      {(location === 'top' || appState.currentCountries.length !== 0) && (
        <p className="countries-shown__text">
          Showing {appState.currentCountries.length} of{' '}
          {appState.countries.length} countries
        </p>
      )}
    </div>
  );
};

export default CountriesShownText;
