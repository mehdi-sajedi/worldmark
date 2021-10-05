import React, { useEffect, useContext } from 'react';
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

  useEffect(() => {
    dispatch({ type: 'GET-DARK-STORAGE' });
  }, [dispatch]);

  useEffect(() => {
    appState.darkMode && document.body.classList.add('darkmode');
    !appState.darkMode && document.body.classList.remove('darkmode');
  }, [appState.darkMode]);

  useEffect(() => {
    dispatch({ type: 'SET-ALL-COUNTRIES', payload: countries });
    createCountryKeyPairs(countries);
  }, [dispatch, appState.countries]);
 
  useEffect(() => {
    dispatch({
      type: 'SET-CURRENT-COUNTRIES',
      payload: {
        idxFirst: appState.currentPageFirstPost,
        idxLast: appState.currentPageLastPost,
      },
    });
    window.scrollTo(0, 0);
  }, [
    dispatch,
    appState.countries,
    appState.allPagesCountries,
    appState.currentPage,
    appState.currentPageFirstPost,
    appState.currentPageLastPost,
  ]);

  useEffect(() => {
    dispatch({ type: 'RESET-TO-FIRST-PAGE' });
  }, [dispatch, appState.allPagesCountries, appState.sortBy]);

  return (
    <>
      <BrowserRouter>
        <Header />
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
