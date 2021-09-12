import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './sass/app.scss';
import { AppContext } from './context/app-context';
import axios from 'axios';
import Header from './components/Utilities/Header';
import SearchFilter from './components/Home/SearchFilter';
import Countries from './components/Home/Countries';
import CountryDetails from './components/DetailsPage/CountryDetails';
import Loading from './components/Utilities/Loading';
import CountriesShownText from './components/Home/CountriesShownText';
import Footer from './components/Home/Footer';
import PageNotFound from './components/Utilities/PageNotFound';

const countryCodesToNames = new Map();
// const subRegions = new Set();

function App() {
  const [countries, setCountries] = useState([]);
  const [numCountriesShown, setNumCountriesShown] = useState(12);
  const [currentCountries, setCurrentCountries] = useState([]);

  const { appState, dispatch2 } = useContext(AppContext);

  useEffect(() => {
    dispatch2({ type: 'GET-DARK-STORAGE' });
  }, []);

  useEffect(() => {
    appState.darkMode && document.body.classList.add('darkmode');
    !appState.darkMode && document.body.classList.remove('darkmode');
  }, [appState.darkMode]);

  const createCountryKeyPairs = (countries) => {
    countries.forEach((country) => {
      countryCodesToNames.set(country.alpha3Code, country.name);
    });
  };

  useEffect(() => {
    const fetchCountries = async () => {
      dispatch2({ type: 'TOGGLE-LOADING' });
      try {
        const res = await axios.get('https://restcountries.eu/rest/v2/all');
        setCountries(res.data);
        createCountryKeyPairs(res.data);
      } catch (error) {
        console.error(error);
      }
      dispatch2({ type: 'TOGGLE-LOADING' });
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    setCurrentCountries(countries.slice(0, numCountriesShown));
  }, [countries, numCountriesShown, setCurrentCountries]);

  // useEffect(() => {
  //   const fetchSubRegions = async () => {
  //     try {
  //       const res = await axios.get('https://restcountries.eu/rest/v2/all');
  //       res.data.forEach((country) => {
  //         subRegions.add(country.subregion);
  //       });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchSubRegions();
  // }, []);

  return (
    <main className="container">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <SearchFilter
              countries={countries}
              currentCountries={currentCountries}
              setCurrentCountries={setCurrentCountries}
            />

            {appState.isLoading && <Loading page="home" />}
            {!appState.isLoading && (
              <>
                <CountriesShownText
                  currentCountries={currentCountries}
                  countries={countries}
                  location="top"
                />
                <Countries currentCountries={currentCountries} />
                <Footer
                  countries={countries}
                  currentCountries={currentCountries}
                  setCurrentCountries={setCurrentCountries}
                  setNumCountriesShown={setNumCountriesShown}
                  numCountriesShown={numCountriesShown}
                />
              </>
            )}
          </Route>
          <Route exact path="/details/:id">
            <CountryDetails countryCodesToNames={countryCodesToNames} />
          </Route>
          <Route>{PageNotFound}</Route>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
