import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import ShowMoreBtn from './ShowMoreBtn';
import CountriesShownText from './CountriesShownText';

const Footer = () => {
  const { appState } = useContext(AppContext);

  return (
    <footer className="footer">
      {appState.currentCountries.length < appState.countries.length &&
        appState.inputText === '' && (
          <ShowMoreBtn />
        )}
      <CountriesShownText location="bottom" />
    </footer>
  );
};

export default Footer;
