import React, { useContext } from 'react';
import FilterSubRegion from './FilterSubRegion';
import subRegionData from '../../data/subregions';
import { RiArrowDownSLine } from 'react-icons/ri';
import { CSSTransition } from 'react-transition-group';
import { AppContext } from '../../context/app-context';

const FilterRegion = ({ region, idx }) => {
  const { appState, dispatch } = useContext(AppContext);

  const toggleSubRegionsMenu = () => {
    dispatch({ type: 'TOGGLE-SUB-REGIONS-MENU', payload: region });
  };

  const toggleRegionCheck = () => {
    dispatch({
      type: 'TOGGLE-REGION-CHECK',
      payload: region,
    });
  };

  return (
    <div className="option">
      <div className="top-layer">
        <input
          type="checkbox"
          id={region}
          checked={appState.regions[region].selected}
          onChange={toggleRegionCheck}
          tabIndex="-1"
        />
        <label className="capitalize" htmlFor={region}>
          <div
            className={`subregion-active-marker ${
              appState.regions[region].atleastOneSubRegionActive && 'active'
            }`}
          ></div>
          {region}
        </label>
        <CSSTransition
          in={appState.regions[region].expanded}
          classNames="turn"
          timeout={0}
        >
          <RiArrowDownSLine
            className="dropdown"
            onClick={toggleSubRegionsMenu}
          />
        </CSSTransition>
      </div>
      <CSSTransition
        in={appState.regions[region].expanded}
        classNames="fade"
        timeout={0}
      >
        <div className="bottom-layer">
          {Object.values(subRegionData)[idx].map((subregion) => {
            return (
              <FilterSubRegion
                region={region}
                name={subregion.name}
                initials={subregion.initials}
                key={subregion.initials}
              />
            );
          })}
        </div>
      </CSSTransition>
    </div>
  );
};

export default FilterRegion;
