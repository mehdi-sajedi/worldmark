import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';

const ShowMoreBtn = () => {
  const { appState, dispatch2 } = useContext(AppContext);

  const showMoreCountries = () => {
    const num =
      appState.numCountriesShown + 120 > 250
        ? 250
        : appState.numCountriesShown + 120;
    dispatch2({ type: 'SET-NUM-COUNTRIES-SHOWN', payload: num });
  };

  return (
    <div className="btn-show-more-container">
      <button onClick={showMoreCountries} className="btn btn-show-more">
        Show More
      </button>
    </div>
  );
};

export default ShowMoreBtn;
