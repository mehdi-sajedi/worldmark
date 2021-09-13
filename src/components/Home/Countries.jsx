import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/app-context';
import Country from './Country';
import { useSpring, useTransition, animated } from 'react-spring';

const Countries = () => {
  const { appState } = useContext(AppContext);
  const [toggle, setToggle] = useState(false);
  const transition = useTransition(toggle, {
    from: { y: 200, opacity: 0.5 },
    enter: { y: 0, opacity: 1 },
  });

  useEffect(() => {
    setToggle((prevState) => !prevState);
  }, [appState.activeRegions, appState.activeSubRegions]);

  return (
    <>
      {/* {transition(
        (style, item) =>
          item && (
            <animated.section
              style={style}
              className={`countries ${
                appState.currentCountries.length <= 5 && 'snapper'
              }`}
            >
              {appState.currentCountries.map((country, idx) => (
                <Country key={idx} {...country} />
              ))}
            </animated.section>
          )
      )} */}
      <section
        className={`countries ${
          appState.currentCountries.length <= 5 && 'snapper'
        }`}
      >
        {appState.currentCountries.map((country, idx) => (
          <Country key={idx} {...country} />
        ))}
      </section>
    </>
  );
};

export default Countries;
