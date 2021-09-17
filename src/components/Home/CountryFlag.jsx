import React from 'react';

const CountryFlag = ({ flag, name }) => {
  return <img className="country__flag" src={flag} alt={`${name} flag`} />;
};

export default CountryFlag;
