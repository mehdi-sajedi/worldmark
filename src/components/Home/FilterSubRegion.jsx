import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';

const FilterSubRegion = ({ region, name, initials }) => {
  const [filterState, dispatch] = useContext(AppContext);

  const toggleSubRegionCheck = (details) => {
    dispatch({ type: 'TOGGLE-SUB-REGION-CHECK', payload: details });
  };

  return (
    <div className="sub-option">
      <input
        type="checkbox"
        id={initials}
        checked={filterState.regions[region].subRegions[initials]}
        onChange={() => toggleSubRegionCheck([region, initials])}
      />
      <label className="capitalize" htmlFor={initials}>
        {name}
      </label>
    </div>
  );
};

export default FilterSubRegion;
