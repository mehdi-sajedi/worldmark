import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';

const DetailtsFilterOption = ({ dropdown, option }) => {
  const { appState, dispatch } = useContext(AppContext);

  const handleDropdownChange = () => {
    dispatch({
      type: 'SET-DETAILS-FILTER',
      payload: { filterType: dropdown, option: option },
    });
  };

  return (
    <>
      <input
        type="radio"
        id={`${dropdown}-${option}`}
        name={dropdown}
        onChange={handleDropdownChange}
        checked={appState[dropdown] === option}
      />
      <label htmlFor={`${dropdown}-${option}`} className="capitalize">
        {option}
      </label>
    </>
  );
};

export default DetailtsFilterOption;
