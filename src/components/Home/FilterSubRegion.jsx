import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';

const FilterSubRegion = ({ region, name, initials }) => {
  const { appState, dispatch } = useContext(AppContext);

  const toggleSubRegionCheck = (details) => {
    dispatch({ type: 'TOGGLE-SUB-REGION-CHECK', payload: details });
  };

  return (
    <div className="sub-option">
      <input
        type="checkbox"
        id={initials}
        checked={appState.regions[region].subRegions[initials].selected}
        onChange={() => toggleSubRegionCheck([region, initials])}
        tabIndex="-1"
      />
      <label className="capitalize" htmlFor={initials}>
        {name}
      </label>
    </div>
  );
};

export default FilterSubRegion;
