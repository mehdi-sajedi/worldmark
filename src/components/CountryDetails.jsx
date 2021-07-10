import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from './utilities/Loading';
import BackBtn from './utilities/BackBtn';

const CountryDetails = ({ countryCodesToNames }) => {
  const { id } = useParams();
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCountry = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
    const data = await res.json();
    setCountry(data);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    fetchCountry();
  }, [fetchCountry]);

  return (
    <>
      <BackBtn />
      <section className="details">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <img className="details__flag" src={country.flag} alt="flag" />
            <div className="details__info">
              <h1 className="details__info__name">{country.name}</h1>
              <div className="details__info__facts">
                <div className="details__info__facts__col-1">
                  <p className="details__info__facts__col-1__native">
                    <span className="weight-600">Native Name: </span>
                    {country.nativeName}
                  </p>
                  <p className="details__info__facts__col-1__population">
                    <span className="weight-600">Population: </span>
                    {country.population?.toLocaleString()}
                  </p>
                  <p className="details__info__facts__col-1__region">
                    <span className="weight-600">Region: </span>
                    {country.region}
                  </p>
                  <p className="details__info__facts__col-1__sub-region">
                    <span className="weight-600">Sub Region: </span>
                    {country.subregion}
                  </p>
                  <p className="details__info__facts__col-1__capital">
                    <span className="weight-600">Capital: </span>
                    {country.capital}
                  </p>
                </div>
                <div className="details__info__facts__col-2">
                  <p className="details__info__facts__col-2__top-level-domain">
                    <span className="weight-600">Top Level Domain: </span>
                    {country.topLevelDomain}
                  </p>
                  <p className="details__info__facts__col-2__currency">
                    <span className="weight-600">Currency: </span>
                    {country.currencies[0].name}
                  </p>
                  <p className="details__info__facts__col-2__languages">
                    <span className="weight-600">Languages: </span>
                    {country.languages.map((lang, idx) => (
                      <span key={idx}>
                        {lang.name}
                        {idx === country.languages.length - 1 ? '' : ', '}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className="details__info__borders">
                <span className="weight-600">Border Countries:</span>
                {country.borders?.map((item, idx) => (
                  <div className="details__info__borders__item" key={idx}>
                    <Link
                      to={`/details/${item}`}
                      className="details__info__borders__item__text"
                    >
                      {countryCodesToNames.get(item)}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default CountryDetails;
