import React from 'react';

const ShowMoreBtn = ({ setNumCountriesShown }) => {
  const showMoreCountries = () => {
    setNumCountriesShown((prevAmount) => {
      return prevAmount + 48 > 250 ? 250 : prevAmount + 48;
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
