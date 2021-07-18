import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './sass/app.scss';
import axios from 'axios';
import Header from './components/Utilities/Header';
import SearchFilter from './components/Home/SearchFilter';
import Countries from './components/Home/Countries';
import CountryDetails from './components/DetailsPage/CountryDetails';
import Loading from './components/Utilities/Loading';
import CountriesShownText from './components/Home/CountriesShownText';
import Footer from './components/Home/Footer';
import PageNotFound from './components/Utilities/PageNotFound';

// TODOS

// ? What to load on initial render?
// The current flaw is the UI unpredictably when filtering by search or dropdown
// Alternative is to render all 250 components, but have placeholders for the images until the user scrolls down to them OR when they try to search/filter for them.

// ? DESIGN
// Make Filter By Region into Filter by Region
// Dropdown will overflow when there are 0 countries

// * Leave these for very end
// Custom favicon
// Accessibility
// Cross-browser compatability

const countryCodesToNames = new Map();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [inputText, setInputText] = useState('');
  const [dropdownText, setDropdownText] = useState('Filter by Region');
  const [numCountriesShown, setNumCountriesShown] = useState(12);
  const [currentCountries, setCurrentCountries] = useState([]);

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
      try {
        const res = await axios.get('https://restcountries.eu/rest/v2/all');
        setCountries(res.data);
        createCountryKeyPairs(res.data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    setCurrentCountries(countries.slice(0, numCountriesShown));
  }, [countries, numCountriesShown, setCurrentCountries]);

  return (
    <main className="container">
      <BrowserRouter>
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Switch>
          <Route exact path="/">
            <SearchFilter
              countries={countries}
              setCurrentCountries={setCurrentCountries}
              inputText={inputText}
              setInputText={setInputText}
              dropdownText={dropdownText}
              setDropdownText={setDropdownText}
            />

            {isLoading && <Loading page="home" />}
            {!isLoading && (
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
                  inputText={inputText}
                  dropdownText={dropdownText}
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
