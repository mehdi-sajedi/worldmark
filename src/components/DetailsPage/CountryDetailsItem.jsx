import React from 'react';

const CountryDetailsItem = ({ className, title, property, column }) => {
  return (
    <li className={`details__info__facts__col-${column}__${className}`}>
      <span className="title">{title}: </span>
      {property || '-'}
    </li>
  );
};

export default CountryDetailsItem;
