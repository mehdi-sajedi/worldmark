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
  const [inputText, setInputText] = useState('');
  const [dropdown, setDropdown] = useState('DEFAULT');
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
                  dropdown === 'DEFAULT' && (
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
