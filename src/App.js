import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './sass/app.scss';
import axios from 'axios';
import Header from './components/Utilities/Header';
import SearchFilter from './components/Home/SearchFilter';
import Countries from './components/Home/Countries';
import CountryDetails from './components/DetailsPage/CountryDetails';
import Loading from './components/Utilities/Loading';
import ShowMoreBtn from './components/Home/ShowMoreBtn';
import NumCountriesShown from './components/Home/NumCountriesShown';

// TODOS

// ? What to load on initial render?
// The current flaw is the UI unpredictably when filtering by search or dropdown
// Alternative is to render all 250 components, but have placeholders for the images until the user scrolls down to them OR when they try to search/filter for them.

// ? DESIGN
// Select dropdown still has default styles
// Back btn looks off, maybe combination of too big/box-shadow/square radius when other elements are circles
// Responsive design/Media Queries

// * Leave these for very end
// Custom favicon
// Accessibility
// Cross-browser compatability

const countryCodesToNames = new Map();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [inputText, setInputText] = useState('');
  const [dropdown, setDropdown] = useState('Filter by region');
  // const [showScrollBtn, setShowScrollBtn] = useState(false);
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
      const res = await axios.get('https://restcountries.eu/rest/v2/all');
      setCountries(res.data);
      createCountryKeyPairs(res.data);
      setIsLoading(false);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    setCurrentCountries(countries.slice(0, numCountriesShown));
  }, [countries, numCountriesShown]);

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
              setCurrentCountries={setCurrentCountries}
              inputText={inputText}
              setInputText={setInputText}
              dropdown={dropdown}
              setDropdown={setDropdown}
            />

            {isLoading ? (
              <Loading />
            ) : (
              <>
                <NumCountriesShown
                  currentCountries={currentCountries}
                  countries={countries}
                  location="top"
                />
                <Countries currentCountries={currentCountries} />
                {currentCountries.length < countries.length &&
                  inputText === '' &&
                  dropdown === 'Filter by region' && (
                    <ShowMoreBtn setNumCountriesShown={setNumCountriesShown} />
                  )}
                <NumCountriesShown
                  currentCountries={currentCountries}
                  countries={countries}
                  location="bottom"
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
