import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/app-context';
import Country from './Country';
import { useAnimatePresence } from 'use-animate-presence';

const Countries = () => {
  const { appState, dispatch } = useContext(AppContext);

  const variants = {
    y: { from: 100, to: 0 },
  };

  const animatedSection = useAnimatePresence({
    variants,
    initial: 'visible',
    enter: () => dispatch({ type: 'CLOSE-ANIMATION' }),
  });

  return (
    <section
      // ref={animatedSection.ref}
      className={`countries ${
        appState.currentCountries.length <= 5 && 'snapper'
      }}
        `}
    >
      {appState.currentCountries.map((country, idx) => (
        <Country key={country.alpha3Code} {...country} />
      ))}
    </section>
  );
};

export default Countries;
