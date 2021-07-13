import React from 'react';

const DropdownItem = ({ country }) => {
  return (
    <div
      className="search-filter__dropdown__options__item"
      data-value={country}
    >
      <input
        className="search-filter__dropdown__options__item__input"
        type="radio"
        name="category"
        id={country}
      />
      <label
        className="search-filter__dropdown__options__item__label"
        htmlFor={country}
      >
        {country}
      </label>
    </div>
  );
};

export default DropdownItem;
