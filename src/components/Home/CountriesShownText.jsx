import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';

const CountriesShownText = ({ location }) => {
  const { appState } = useContext(AppContext);

  return (
    <div className={`countries-shown ${location}`}>
      {(location === 'top' || appState.currentCountries.length !== 0) && (
        <p className="countries-shown__text">
          {appState.totalCountries.length > 0
            ? `Showing ${appState.currentPageFirstPost + 1}-${
                appState.currentPageLastPost
              } of ${appState.totalCountries.length}
          countries`
            : ''}
        </p>
      )}
    </div>
  );
};

export default CountriesShownText;
