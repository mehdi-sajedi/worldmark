import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';

const CountryDetails = () => {
  const { country } = useParams();
  const [currentCountry, setCurrentCountry] = useState([]);

  const fetchCountry = useCallback(async () => {
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    const data = await res.json();
    setCurrentCountry(...data);
  }, [country]);

  useEffect(() => {
    console.log('i ran');
    fetchCountry();
  }, [fetchCountry]);

  return (
    <div>
      <h1
        style={{
          textAlign: 'center',
          marginTop: '5rem',
          textTransform: 'capitalize',
        }}
      >
        {country} - Details
      </h1>
      <img src={currentCountry.flag} alt="" />
    </div>
  );
};

export default CountryDetails;
