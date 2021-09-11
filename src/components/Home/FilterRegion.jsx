import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

const FilterRegion = ({ filterState, dispatch }) => {
  const toggleSubRegionsMenu = (region) => {
    dispatch({ type: 'TOGGLE-SUB-REGIONS-MENU', payload: region });
  };

  const toggleRegionCheck = (idx) => {
    dispatch({ type: 'TOGGLE-REGION-CHECK', payload: idx });
  };

  const toggleSubRegionCheck = (details) => {
    dispatch({ type: 'TOGGLE-SUB-REGION-CHECK', payload: details });
  };
  
  return (
    <div className="option">
      <div className="top-layer">
        <input
          type="checkbox"
          id="africa"
          checked={filterState.regions['africa'].selected}
          onChange={() => toggleRegionCheck('africa')}
        />
        <label htmlFor="africa">Africa</label>
        <RiArrowDownSLine
          className="dropdown"
          onClick={() => toggleSubRegionsMenu('africa')}
        />
      </div>
      <div
        className={`bottom-layer ${
          filterState.regions['africa'].expanded ? 'sub-open' : undefined
        }`}
      >
        <div className="sub-option">
          <input
            type="checkbox"
            id="af-n"
            checked={filterState.regions['africa'].subRegions['af_n']}
            onChange={() => toggleSubRegionCheck(['africa', 'af_n'])}
          />
          <label htmlFor="af-n">Northern</label>
        </div>
        <div className="sub-option">
          <input type="checkbox" id="af-s" />
          <label htmlFor="af-s">Southern</label>
        </div>
        <div className="sub-option">
          <input type="checkbox" id="af-w" />
          <label htmlFor="af-w">Western</label>
        </div>
        <div className="sub-option">
          <input type="checkbox" id="af-e" />
          <label htmlFor="af-e">Eastern</label>
        </div>
        <div className="sub-option">
          <input type="checkbox" id="af-m" />
          <label htmlFor="af-m">Middle</label>
        </div>
      </div>
    </div>
  );
};

export default FilterRegion;
