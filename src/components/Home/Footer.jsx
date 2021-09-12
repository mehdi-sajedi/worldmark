import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import ShowMoreBtn from './ShowMoreBtn';
import CountriesShownText from './CountriesShownText';

const Footer = ({ countries, currentCountries, setNumCountriesShown }) => {
  const { appState } = useContext(AppContext);

  return (
    <footer className="footer">
      {currentCountries.length < countries.length &&
        appState.inputText === '' && (
          <ShowMoreBtn setNumCountriesShown={setNumCountriesShown} />
        )}
      <CountriesShownText
        currentCountries={currentCountries}
        countries={countries}
        location="bottom"
      />
    </footer>
  );
};

export default Footer;
