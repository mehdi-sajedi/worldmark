import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/app-context';
// import Loading from '../Utilities/Loading';
import BackBtn from './BackBtn';
import CountryDetailsItem from './CountryDetailsItem';
import { useTransition, animated } from 'react-spring';
// import history from '../Utilities/history';

const CountryDetails = ({ countryCodesToNames }) => {
  const { appState } = useContext(AppContext);
  const { id } = useParams();
  const [country, setCountry] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const transition = useTransition(!isLoading, {
    from: { x: 100, y: 0, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
    delay: 50,
  });

  const transitionFlag = useTransition(!isLoading, {
    from: { x: -100, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    delay: 50,
  });

  useEffect(() => {
    setIsLoading(true);
    const currCountry = appState.countries.find((country) => {
      return country.alpha3Code === id;
    });

    if (currCountry) {
      setIsLoading(false);
      setCountry(currCountry);
      setIsError(false);
    } else {
      console.log('check');
      setIsError(true);
      setIsLoading(false);
    }
  }, [id, appState.countries]);

  // {transition(
  //   (style, item) =>
  //     item && (

  return (
    <>
      <BackBtn setIsLoading={setIsLoading} />
      <section className="details-container">
        {/* {isLoading && <Loading />} */}
        {isError && appState.countries.length > 0 && (
          <p className="page-not-found">
            Could not fetch country with Alpha-3 Code {id}
          </p>
        )}
        {!isError && !isLoading && (
          <>
            <div className="details">
              {transitionFlag(
                (style, item) =>
                  item && (
                    <animated.img
                      style={style}
                      className="details__flag"
                      src={country.flag}
                      alt="country flag"
                    />
                  )
              )}
              {transition(
                (style, item) =>
                  item && (
                    <animated.div className="details__info" style={style}>
                      <h1 className="details__info__name">
                        {country.officialName}
                      </h1>
                      <div className="details__info__facts">
                        <div className="details__info__facts__col-1">
                          <CountryDetailsItem
                            className="native-name"
                            title="Common Name"
                            property={country._name}
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
                            column="1"
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
                                {idx === country.languages.length - 1
                                  ? ''
                                  : ', '}
                              </span>
                            ))}
                            column="1"
                          />
                        </div>
                      </div>
                      <div className="details__info__borders">
                        <span className="details__info__borders__title">
                          Border Countries:
                        </span>
                        <div className="details__info__borders__countries">
                          {country?.borders ? (
                            country.borders.map((item, idx) => (
                              <div
                                className="details__info__borders__countries__item"
                                key={idx}
                              >
                                <Link
                                  to={`/details/${item}`}
                                  className="details__info__borders__countries__item__text"
                                  onClick={() => setIsLoading((prev) => !prev)}
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
                    </animated.div>
                  )
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default CountryDetails;
