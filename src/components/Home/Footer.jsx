import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import CountriesShownText from './CountriesShownText';
import Pagination from './Pagination';

const Footer = () => {
  const { appState } = useContext(AppContext);
  return (
    <footer className="footer">
      <CountriesShownText location="bottom" />
      <Pagination />
    </footer>
  );
};

export default Footer;
