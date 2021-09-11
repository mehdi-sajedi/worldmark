import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useImmerReducer } from 'use-immer';
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

// Africa (5)
/*
Northern Africa
Middle Africa
Western Africa
Southern Africa
Eastern Africa
*/

// America (4)
/*
Northern America
Southern America
Central America
Caribbean
*/

// Asia (5)
/*
Southern Asia
Western Asia
South-Eastern Asia
Eastern Asia
Central Asia

*/

// Europe (4)
/*
Northern Europe
Southern Europe
Western Europe
Eastern Europe
*/

// Oceania (4)
/*
Australia and New Zealand
Melanesia
Micronesia
Polynesia
*/

const countryCodesToNames = new Map();
const subRegions = new Set();

const initialFilterState = {
  menuOpen: false,
  minPopulation: 0,
  maxPopulation: 9999999999,
  regions: {
    africa: {
      id: 'africa',
      open: false,
      af_n: true,
      af_s: true,
      af_w: true,
      af_e: true,
      af_m: true,
    },
    america: {
      id: 'america',
      open: false,
      am_n: true,
      am_s: true,
      am_c: true,
      caribbean: true,
    },
    asia: {
      id: 'asia',
      open: false,
      as_n: true,
      as_s: true,
      as_w: true,
      as_e: true,
      as_se: true,
    },
    europe: {
      id: 'europe',
      open: false,
      eu_n: true,
      eu_s: true,
      eu_w: true,
      eu_e: true,
    },
    oceania: {
      id: 'oceania',
      open: false,
      aus_nz: true,
      mel: true,
      mic: true,
      pol: true,
    },
  },
};

const reducer = (draft, action) => {
  if (action.type === 'TOGGLE-MENU') {
    draft.menuOpen = !draft.menuOpen;
  }

  if (action.type === 'TOGGLE-SUB-REGIONS') {
    Object.values(draft.regions).forEach((item) => {
      if (item.id === action.payload) item.open = !item.open;
    });
  }
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [inputText, setInputText] = useState('');
  const [dropdownText, setDropdownText] = useState('Filter by Region');
  const [numCountriesShown, setNumCountriesShown] = useState(12);
  const [currentCountries, setCurrentCountries] = useState([]);

  const [filterState, dispatch] = useImmerReducer(reducer, initialFilterState);

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

  useEffect(() => {
    const fetchSubRegions = async () => {
      try {
        const res = await axios.get('https://restcountries.eu/rest/v2/all');
        res.data.forEach((country) => {
          subRegions.add(country.subregion);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubRegions();
    // console.log(subRegions);
  }, []);

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
              //
              filterState={filterState}
              dispatch={dispatch}
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
