import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { FiSliders } from 'react-icons/fi';

const FilterBtn = () => {
  const { dispatch } = useContext(AppContext);

  const toggleFilterMenu = () => {
    dispatch({ type: 'TOGGLE-FILTER-MENU' });
  };

  return (
    <div className="filter-wrapper" onClick={toggleFilterMenu}>
      <FiSliders className="filter-icon" />
    </div>
  );
};

export default FilterBtn;
