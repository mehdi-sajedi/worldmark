import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './sass/app.scss';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import Countries from './components/Countries';
import CountryDetails from './components/CountryDetails';
import Loading from './components/utilities/Loading';

// TODOS
// Fix select tag dropdown arrow placement or build custom dropdown component
// Refactor the code from the facts section. Render by loop and maybe convert to list items
// Make design changes for darkmode
// Incorporate pagination - don't load all countries on initial render, allow user to load more from button
// Implement better practice for listening to scroll event

const countryCodesToNames = new Map();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [inputText, setInputText] = useState('');
  const [dropdown, setDropdown] = useState('DEFAULT');
  // const [showScrollBtn, setShowScrollBtn] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    localStorage.setItem('darkmode', JSON.stringify(!darkMode));
  };

  useEffect(() => {
    darkMode && document.body.classList.add('darkmode');
    !darkMode && document.body.classList.remove('darkmode');
  }, [darkMode]);

  useEffect(() => {
    setDarkMode(JSON.parse(localStorage.getItem('darkmode')));
  }, []);

  const createCountryKeyPairs = (countries) => {
    countries.forEach((country) => {
      countryCodesToNames.set(country.alpha3Code, country.name);
    });
  };

  const fetchCountries = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(`https://restcountries.eu/rest/v2/all`);
    const countries = await res.json();
    setCountries(countries);
    setFilteredCountries(countries);
    createCountryKeyPairs(countries);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  // const checkScrollPosition = () => {
  //   console.log('runnin');
  //   window.pageYOffset >= 1250 &&
  //     setShowScrollBtn(true) &&
  //     clearEventListener();
  // };

  // window.addEventListener('scroll', checkScrollPosition);

  // const clearEventListener = () => {
  //   window.removeEventListener('scroll', checkScrollPosition);
  // };

  return (
    <BrowserRouter>
      <main className="container">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Switch>
          <Route exact path="/">
            {/* {showScrollBtn && <ScrollToTopBtn />} */}
            <SearchFilter
              countries={countries}
              setFilteredCountries={setFilteredCountries}
              inputText={inputText}
              setInputText={setInputText}
              dropdown={dropdown}
              setDropdown={setDropdown}
            />
            {isLoading ? (
              <Loading />
            ) : (
              <Countries filteredCountries={filteredCountries} />
            )}
          </Route>
          <Route path="/details/:id">
            <CountryDetails countryCodesToNames={countryCodesToNames} />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
