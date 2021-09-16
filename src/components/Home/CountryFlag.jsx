import React, { useEffect } from 'react';
import Loading from '../Utilities/Loading';

const CountryFlag = ({ flag, name }) => {
  return <img className="country__flag" src={flag} alt={`${name} flag`} />;
};

export default CountryFlag;
