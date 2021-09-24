import React from 'react';

const CountryFlag = ({ flag, name, alpha3Code }) => {
  return <img className="country__flag" src={flag} alt={`${name} flag`} />;
  // return (
  //   <img
  //     className="country__flag"
  //     src={`images/${alpha3Code}.svg`}
  //     alt={`${name} flag`}
  //   />
  // );
};

export default CountryFlag;
