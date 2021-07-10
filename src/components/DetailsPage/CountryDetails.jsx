import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Utilities/Loading';
import BackBtn from './BackBtn';
import CountryDetailsItem from './CountryDetailsItem';

// const {
//   nativeName,
//   population,
//   region,
//   subregion,
//   capital,
//   topLevelDomain,
//   currencies,
//   languages,
// } = data;

const CountryDetails = ({ countryCodesToNames }) => {
  const { id } = useParams();
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCountry = useCallback(async () => {
    setIsLoading(true);
    const res = await axios.get(`https://restcountries.eu/rest/v2/alpha/${id}`);
    setCountry(res.data);
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
            <img className="details__flag" src={country.flag} alt="country flag" />
            <div className="details__info">
              <h1 className="details__info__name">{country.name}</h1>
              <div className="details__info__facts">
                <div className="details__info__facts__col-1">
                  <CountryDetailsItem
                    className="native"
                    title="Native Name"
                    property={country.nativeName}
                    column="1"
                  />
                  <CountryDetailsItem
                    className="population"
                    title="Population"
                    property={country.population.toLocaleString()}
                    column="1"
                  />
                  <CountryDetailsItem
                    className="region"
                    title="Region"
                    property={country.region}
                    column="1"
                  />
                  <CountryDetailsItem
                    className="sub-region"
                    title="Sub Region"
                    property={country.subregion}
                    column="1"
                  />
                  <CountryDetailsItem
                    className="capital"
                    title="Capital"
                    property={country.capital}
                    column="1"
                  />
                </div>
                <div className="details__info__facts__col-2">
                  <CountryDetailsItem
                    className="top-level-domain"
                    title="Top Level Domain"
                    property={country.topLevelDomain}
                    column="2"
                  />
                  <CountryDetailsItem
                    className="currency"
                    title="Currency"
                    property={country.currencies[0].name}
                    column="2"
                  />
                  <CountryDetailsItem
                    className="languages"
                    title="Languages"
                    property={country.languages.map((lang, idx) => (
                      <span key={idx}>
                        {lang.name}
                        {idx === country.languages.length - 1 ? '' : ', '}
                      </span>
                    ))}
                    column="2"
                  />
                </div>
              </div>
              <div className="details__info__borders">
                <span className="weight-600">Border Countries:</span>
                {country.borders.length !== 0 ? (
                  country.borders.map((item, idx) => (
                    <div className="details__info__borders__item" key={idx}>
                      <Link
                        to={`/details/${item}`}
                        className="details__info__borders__item__text"
                      >
                        {countryCodesToNames.get(item)}
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="details__info__borders__item">
                    <Link
                      to={`/details/${country.alpha3Code}`}
                      className="details__info__borders__item__text"
                    >
                      None
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default CountryDetails;
