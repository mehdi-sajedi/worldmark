import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContext } from './context/app-context';
import countries from './data/countries.json';
import './sass/app.scss';
import Header from './components/Utilities/Header';
import SearchBar from './components/Home/SearchBar';
import CountriesGrid from './components/Home/CountriesGrid';
import CountryDetails from './components/DetailsPage/CountryDetails';
import CountriesShownText from './components/Home/CountriesShownText';
import Footer from './components/Home/Footer';
import PageNotFound from './components/Utilities/PageNotFound';
import FilterBtn from './components/Home/FilterBtn';
import FilterMenu from './components/Home/FilterMenu';
import Overlay from './components/Utilities/Overlay';
import ScrollBtn from './components/Utilities/ScrollBtn';

function App() {
  const { appState, dispatch } = useContext(AppContext);
  const [darkMode, setDarkMode] = useState(false);

  // Persist darkmode in local storage
  useEffect(() => {
    setDarkMode(!JSON.parse(localStorage.getItem('darkmode')));
    if (!JSON.parse(localStorage.getItem('darkmode'))) {
      document.body.classList.add('darkmode');
    } else if (JSON.parse(localStorage.getItem('darkmode'))) {
      document.body.classList.remove('darkmode');
    }
  }, []);

  // Get all the countries and put them in state
  useEffect(() => {
    dispatch({ type: 'SET-ALL-COUNTRIES', payload: countries });
  }, [dispatch, appState.countries]);

  // Set the current countries when the page is changed
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

  // Set the current countries when the countries/page slider is adjusted
  useEffect(() => {
    dispatch({ type: 'SET-CURRENT-COUNTRIES' });
  }, [dispatch, appState.currentPageFirstPost, appState.currentPageLastPost]);

  // When the sorting is changed, reset to first page
  useEffect(() => {
    dispatch({ type: 'RESET-TO-FIRST-PAGE' });
  }, [dispatch, appState.allPagesCountries, appState.sortBy]);

  return (
    <>
      <BrowserRouter>
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <SearchBar />
              <CountriesShownText location="top" />
              <CountriesGrid />
              <FilterMenu />
              <FilterBtn />
              <ScrollBtn />
              {appState.allPagesCountries.length > 0 && <Footer />}
            </Route>
            <Route exact path="/details/:id">
              <CountryDetails />
            </Route>
            <Route>{PageNotFound}</Route>
          </Switch>
        </div>
      </BrowserRouter>
      <Overlay />
    </>
  );
}

export default App;
