import React from 'react';

const ShowMoreBtn = ({ setNumCountriesShown }) => {
  const showMoreCountries = () => {
    setNumCountriesShown((prevAmount) => {
      return prevAmount + 120 > 250 ? 250 : prevAmount + 120;
    });
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
