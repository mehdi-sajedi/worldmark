import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './sass/app.scss';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import Countries from './components/Countries';
import CountryDetails from './components/CountryDetails';
import Loading from './components/utilities/Loading';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [inputText, setInputText] = useState('');
  const [dropdown, setDropdown] = useState('all');

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    darkMode && document.body.classList.add('darkmode');
    !darkMode && document.body.classList.remove('darkmode');
  }, [darkMode]);

  const fetchCountries = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(`https://restcountries.eu/rest/v2/all`);
    const data = await res.json();
    setCountries(data);
    setFilteredCountries(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return (
    <BrowserRouter>
      <main className="container">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Switch>
          <Route exact path="/">
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
            <CountryDetails />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
