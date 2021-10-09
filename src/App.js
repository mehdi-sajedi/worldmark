import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContext } from './context/app-context';
import countries from './data/countries.json';
import './sass/app.scss';
import Header from './components/Utilities/Header';
import SearchFilter from './components/Home/SearchBar';
import CountriesGrid from './components/Home/CountriesGrid';
import CountryDetails from './components/DetailsPage/CountryDetails';
import CountriesShownText from './components/Home/CountriesShownText';
import Footer from './components/Home/Footer';
import PageNotFound from './components/Utilities/PageNotFound';
import FilterBtn from './components/Home/FilterBtn';
import FilterMenu from './components/Home/FilterMenu';
import Overlay from './components/Utilities/Overlay';
import ScrollBtn from './components/Utilities/ScrollBtn';

const countryCodesToNames = new Map();

const createCountryKeyPairs = (countries) => {
  countries.forEach((country) => {
    countryCodesToNames.set(country.alpha3Code, country.name);
  });
};

function App() {
  const { appState, dispatch } = useContext(AppContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setDarkMode(!JSON.parse(localStorage.getItem('darkmode')));
    if (!JSON.parse(localStorage.getItem('darkmode'))) {
      document.body.classList.add('darkmode');
    } else if (JSON.parse(localStorage.getItem('darkmode'))) {
      document.body.classList.remove('darkmode');
    }
  }, []);

  useEffect(() => {
    dispatch({ type: 'SET-ALL-COUNTRIES', payload: countries });
    createCountryKeyPairs(countries);
  }, [dispatch, appState.countries]);

  useEffect(() => {
    dispatch({
      type: 'SET-CURRENT-COUNTRIES',
    });
    window.scrollTo(0, 0);
  }, [
    dispatch,
    appState.countries,
    appState.allPagesCountries,
    appState.currentPage,
  ]);

  useEffect(() => {
    dispatch({ type: 'SET-CURRENT-COUNTRIES' });
  }, [dispatch, appState.currentPageFirstPost, appState.currentPageLastPost]);

  useEffect(() => {
    dispatch({ type: 'RESET-TO-FIRST-PAGE' });
  }, [dispatch, appState.allPagesCountries, appState.sortBy]);

  return (
    <>
      <BrowserRouter>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="container">
          <Switch>
            <Route exact path="/">
              <SearchFilter />
              <CountriesShownText location="top" />
              <CountriesGrid />
              <FilterMenu />
              <FilterBtn />
              <ScrollBtn />
              {appState.allPagesCountries.length > 0 && <Footer />}
            </Route>
            <Route exact path="/details/:id">
              <CountryDetails countryCodesToNames={countryCodesToNames} />
            </Route>
            <Route>{PageNotFound}</Route>
          </Switch>
        </main>
      </BrowserRouter>
      <Overlay />
    </>
  );
}

export default App;
