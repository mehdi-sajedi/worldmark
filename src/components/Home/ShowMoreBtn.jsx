import React from 'react';

const ShowMoreBtn = ({ setNumCountriesShown }) => {
  const showMoreCountries = () => {
    setNumCountriesShown((prevAmount) => {
      return prevAmount + 48 > 250 ? 250 : prevAmount + 48;
    });
  };

  return (
    <div className="show-more-btn-container">
      <button onClick={showMoreCountries} className="btn show-more-btn">
        <span className="show-more-btn__text">Show More</span>
      </button>
    </div>
  );
};

export default ShowMoreBtn;
