import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './sass/app.scss';
import axios from 'axios';
import Header from './components/Utilities/Header';
import SearchFilter from './components/Home/SearchFilter';
import Countries from './components/Home/Countries';
import CountryDetails from './components/DetailsPage/CountryDetails';
import Loading from './components/Utilities/Loading';
import LoadMoreBtn from './components/Home/LoadMoreBtn';
import NumCountriesDisplayed from './components/Home/NumCountriesDisplayed';

// TODOS
// Fix select tag dropdown arrow placement or build custom dropdown component
// Refactor the code from the facts section. Render by loop and maybe convert to list items
// Implement better practice for listening to scroll event
// Add custom favicon
// Improve accessbility

const countryCodesToNames = new Map();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [inputText, setInputText] = useState('');
  const [dropdown, setDropdown] = useState('DEFAULT');
  // const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [countriesDisplayed, setCountriesDisplayed] = useState(16);

  useEffect(() => {
    setDarkMode(JSON.parse(localStorage.getItem('darkmode')));
  }, []);

  useEffect(() => {
    darkMode && document.body.classList.add('darkmode');
    !darkMode && document.body.classList.remove('darkmode');
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    localStorage.setItem('darkmode', JSON.stringify(!darkMode));
  };

  const createCountryKeyPairs = (countries) => {
    countries.forEach((country) => {
      countryCodesToNames.set(country.alpha3Code, country.name);
    });
  };

  useEffect(() => {
    const fetchCountries = async () => {
      setIsLoading(true);
      const res = await axios.get('https://restcountries.eu/rest/v2/all');
      setCountries(res.data);
      setFilteredCountries(res.data);
      createCountryKeyPairs(res.data);
      setIsLoading(false);
    };
    fetchCountries();
  }, []);

  // const idxOfLastPost = currentPage * countriesDisplayed; // 1 * 4 = 4 --- Next load 2 * 4 = 8
  // const idxOfFirstPost = idxOfLastPost - countriesDisplayed; // 4 - 4 = 0 --- Next load 8 - 4 = 4
  // const currentCountries = filteredCountries.slice(
  //   idxOfFirstPost, // 0 --- Next load 4
  //   idxOfLastPost // 4 --- Next load 8
  // );

  const currentCountries = filteredCountries.slice(0, countriesDisplayed);

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
              filteredCountries={filteredCountries}
            />
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <Countries filteredCountries={currentCountries} />
                {currentCountries.length < filteredCountries.length && (
                  <LoadMoreBtn setCountriesDisplayed={setCountriesDisplayed} />
                )}
                <NumCountriesDisplayed
                  countriesDisplayed={countriesDisplayed}
                  countries={countries}
                />
              </>
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
