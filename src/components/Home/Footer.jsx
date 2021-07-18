import React from 'react';
import ShowMoreBtn from './ShowMoreBtn';
import CountriesShownText from './CountriesShownText';
// import ScrollToTopBtn from './ScrollToTopBtn';

const Footer = ({
  countries,
  currentCountries,
  setCurrentCountries,
  inputText,
  dropdownText,
  setNumCountriesShown,
  numCountriesShown,
}) => {
  // const [showScrollBtn, setShowScrollBtn] = useState(false);

  

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
    <footer className="footer">
      {currentCountries.length < countries.length &&
        inputText === '' &&
        dropdownText === 'Filter by Region' && (
          <ShowMoreBtn setNumCountriesShown={setNumCountriesShown} />
        )}
      <CountriesShownText
        currentCountries={currentCountries}
        countries={countries}
        location="bottom"
      />
      {/* {showScrollBtn && <ScrollToTopBtn />} */}
    </footer>
  );
};

export default Footer;
