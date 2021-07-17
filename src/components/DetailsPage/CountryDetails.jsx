import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../Utilities/Loading';
import BackBtn from './BackBtn';
import CountryDetailsItem from './CountryDetailsItem';

const CountryDetails = ({ countryCodesToNames }) => {
  const { id } = useParams();
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCountry = useCallback(async () => {
    setIsLoading(true);
    const res = await axios.get(`https://restcountries.eu/rest/v2/alpha/${id}`);
    setCountry(res.data);
    setIsLoading(false);
    console.log(res.data);
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
            <img
              className="details__flag"
              src={country.flag}
              alt="country flag"
            />
            <div className="details__info">
              <h1 className="details__info__name">{country.name}</h1>
              <div className="details__info__facts">
                <div className="details__info__facts__col-1">
                  <CountryDetailsItem
                    className="native-name"
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
                    className="capital"
                    title="Capital"
                    property={country.capital}
                    column="1"
                  />
                  <CountryDetailsItem
                    className="currency"
                    title="Currency"
                    property={country.currencies[0].name}
                    column="1"
                  />

                  <CountryDetailsItem
                    className="alpha-3-code"
                    title="Alpha-3 Code"
                    property={country.alpha3Code}
                    column="2"
                  />
                </div>
                <div className="details__info__facts__col-2">
                  <CountryDetailsItem
                    className="region"
                    title="Region"
                    property={country.region}
                    column="2"
                  />
                  <CountryDetailsItem
                    className="sub-region"
                    title="Sub Region"
                    property={country.subregion}
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
                    column="1"
                  />
                </div>
              </div>
              <div className="details__info__borders">
                <span className="details__info__borders__title fw-600">
                  Border Countries:
                </span>
                <div className="details__info__borders__countries">
                  {country.borders.length !== 0 ? (
                    country.borders.map((item, idx) => (
                      <div
                        className="details__info__borders__countries__item"
                        key={idx}
                      >
                        <Link
                          to={`/details/${item}`}
                          className="details__info__borders__countries__item__text"
                        >
                          {countryCodesToNames.get(item)}
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="details__info__borders__countries__item ">
                      <p className="details__info__borders__countries__item__text cursor-default">
                        None
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default CountryDetails;
