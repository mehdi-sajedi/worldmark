import React from 'react';
import CountriesShownText from './CountriesShownText';
import Pagination from './Pagination';

const Footer = () => {
  return (
    <footer className="footer">
      <CountriesShownText location="bottom" />
      <Pagination />
    </footer>
  );
};

export default Footer;
