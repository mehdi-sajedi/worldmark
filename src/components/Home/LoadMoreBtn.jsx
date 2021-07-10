import React from 'react';

const LoadMoreBtn = ({ setCountriesDisplayed }) => {
  const loadMoreCountries = () => {
    setCountriesDisplayed((prevAmount) => {
      return prevAmount + 44 > 250 ? 250 : prevAmount + 44;
    });
  };

  return (
    <div className="load-btn-container">
      <button onClick={loadMoreCountries} className="btn load-btn">
        <span className="load-btn__text">Load More</span>
      </button>
    </div>
  );
};

export default LoadMoreBtn;
