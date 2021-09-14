import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from '../../context/app-context';
import Country from './Country';
import { Spring, useSpring, useTransition, animated } from 'react-spring';

const Countries = () => {
  const { appState, dispatch } = useContext(AppContext);
  const [toggle, setToggle] = useState(false);
  // const transition = useTransition(toggle, {
  //   from: { y: 200, opacity: 0.5 },
  //   enter: { y: 0, opacity: 1 },
  // });

  // const props = useSpring({
  //   to: { opacity: 1, translateY: '0' },
  //   from: { opacity: 0.8, translateY: '100px' },
  // });

  // const [style, api] = useSpring(() => ({ x: 0, y: 100 }));
  // useEffect(() => {
  //   api.start({ x: 0, y: 0 });
  // }, [api, appState]);

  // useEffect(() => {
  //   setToggle((prevState) => !prevState);
  // }, [appState.activeRegions, appState.activeSubRegions]);

  useEffect(() => {
    dispatch({ type: 'ATTACH-ANIMATION' });
  }, [appState.currentCountries]);

  const handleAnimationEnd = () => {
    dispatch({ type: 'CLOSE-ANIMATION' });
  };

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
                <Country key={country.name} {...country} />
              ))}
            </animated.section>
          )
      )} */}
      <section
        className={`countries ${
          appState.currentCountries.length <= 5 && 'snapper'
        } ${appState.playAnimation && 'play-animation'}
        `}
        onAnimationEnd={handleAnimationEnd}
      >
        {appState.currentCountries.map((country, idx) => (
          <Country key={idx} {...country} />
        ))}
      </section>
      {/* <animated.section
        style={style}
        className={`countries ${
          appState.currentCountries.length <= 5 && 'snapper'
        }`}
      >
        {appState.currentCountries.map((country, idx) => (
          <Country key={idx} {...country} />
        ))}
      </animated.section> */}
    </>
  );
};

export default Countries;
