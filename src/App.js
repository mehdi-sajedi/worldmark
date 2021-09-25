import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContext } from './context/app-context';
import './sass/app.scss';
import Header from './components/Utilities/Header';
import SearchFilter from './components/Home/SearchFilter';
import Countries from './components/Home/Countries';
import CountryDetails from './components/DetailsPage/CountryDetails';
import Loading from './components/Utilities/Loading';
import CountriesShownText from './components/Home/CountriesShownText';
import Footer from './components/Home/Footer';
import PageNotFound from './components/Utilities/PageNotFound';
import FilterBtn from './components/Home/FilterBtn';
import FilterMenu from './components/Home/FilterMenu';
import Overlay from './components/Utilities/Overlay';
import countries from './data/countries.json';
import axios from 'axios';

const countryCodesToNames = new Map();

function App() {
  const { appState, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: 'GET-DARK-STORAGE' });
  }, [dispatch]);

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
      const res = await axios.get('https://restcountries.com/v3/all');
      const data = await Object.values(res.data)
        .sort((a, b) => a.cca2.localeCompare(b.cca2))
        .map((country) => {
          return {
            _name: country.name.common,
            officialName: country.name.official,
            unMember: country.unMember,
            independent: country.independent,
            borders: country.borders,
            area: country.area,
            landlocked: country.landlocked,
            _languages: country.languages,
          };
        });

      dispatch({ type: 'temp', payload: data });
      dispatch({ type: 'SET-ALL-COUNTRIES', payload: countries });
      createCountryKeyPairs(countries);
      nextFunction();
    };
    fetchCountries();

    function nextFunction() {
      const copy = appState.countries.slice();
      const result = copy
        .sort((a, b) => a.alpha2Code.localeCompare(b.alpha2Code))
        .map((country, idx) => {
          return { ...country, ...appState.temp[idx] };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

      dispatch({ type: 'temp', payload: result });
    }
  }, [dispatch, appState.countries]);

  // const idxOfFirstPost =
  //   appState.currentPage * appState.countriesPerPage -
  //   appState.countriesPerPage;
  // const idxOfLastPost = appState.currentPage * appState.countriesPerPage;

  useEffect(() => {
    dispatch({
      type: 'SET-CURRENT-COUNTRIES',
      // payload: { idxFirst: idxOfFirstPost, idxLast: idxOfLastPost },
      payload: {
        idxFirst: appState.currentPageFirstPost,
        idxLast: appState.currentPageLastPost,
      },
    });
    window.scrollTo(0, 0);
  }, [
    dispatch,
    appState.countries,
    appState.totalCountries,
    appState.currentPage,
    appState.currentPageFirstPost,
    appState.currentPageLastPost,
    // idxOfFirstPost,
    // idxOfLastPost,
  ]);

  useEffect(() => {
    dispatch({ type: 'RESET-TO-FIRST-PAGE' });
  }, [dispatch, appState.totalCountries, appState.sortBy]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="container">
          <Switch>
            <Route exact path="/">
              <a
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                  JSON.stringify(appState.temp)
                )}`}
                download="filename.json"
              >
                {`Download Json`}
              </a>
              <SearchFilter />
              <FilterBtn />
              <FilterMenu />
              {appState.isLoading && <Loading page="home" />}
              {!appState.isLoading && (
                <>
                  <CountriesShownText location="top" />
                  <Countries />
                  <Footer />
                </>
              )}
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
