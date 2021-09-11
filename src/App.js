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

const countryCodesToNames = new Map();
const subRegions = new Set();

const initialFilterState = {
  menuOpen: false,
  minPopulation: 0,
  maxPopulation: 9999999999,
  regions: {
    africa: {
      id: 'africa',
      expanded: false,
      selected: false,
      subRegions: {
        af_n: false,
        af_s: true,
        af_w: true,
        af_e: true,
        af_m: true,
      },
    },
    america: {
      id: 'america',
      expanded: false,
      selected: false,
      subRegions: {
        am_n: true,
        am_s: true,
        am_c: true,
        caribbean: true,
      },
    },
    asia: {
      id: 'asia',
      expanded: false,
      selected: false,
      subRegions: {
        as_n: true,
        as_s: true,
        as_w: true,
        as_e: true,
        as_se: true,
      },
    },
    europe: {
      id: 'europe',
      expanded: false,
      selected: false,
      subRegions: {
        eu_n: true,
        eu_s: true,
        eu_w: true,
        eu_e: true,
      },
    },
    oceania: {
      id: 'oceania',
      expanded: false,
      selected: false,
      subRegions: {
        aus_nz: true,
        mel: true,
        mic: true,
        pol: true,
      },
    },
  },
};

const reducer = (draft, action) => {
  if (action.type === 'TOGGLE-FILTER-MENU') {
    draft.menuOpen = !draft.menuOpen;
  }

  if (action.type === 'TOGGLE-SUB-REGIONS-MENU') {
    // Object.values(draft.regions).forEach((r) => {
    //   if (r.id === action.payload) r.expanded = !r.expanded;
    //   if (r.expanded && r.id !== action.payload) r.expanded = !r.expanded;
    // });
    draft.regions[action.payload].expanded =
      !draft.regions[action.payload].expanded;
  }

  if (action.type === 'TOGGLE-REGION-CHECK') {
    draft.regions[action.payload].selected =
      !draft.regions[action.payload].selected;
  }

  if (action.type === 'TOGGLE-SUB-REGION-CHECK') {
    draft.regions[action.payload[0]].subRegions[action.payload[1]] =
      !draft.regions[action.payload[0]].subRegions[action.payload[1]];
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
