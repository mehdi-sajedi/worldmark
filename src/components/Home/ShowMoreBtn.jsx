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
        Show More
      </button>
    </div>
  );
};

export default ShowMoreBtn;
