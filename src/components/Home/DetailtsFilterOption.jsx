import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';

const DetailtsFilterOption = ({ dropdown, option, action }) => {
  const { appState, dispatch } = useContext(AppContext);

  const handleDropdownChange = (action, dropdown, option) => {
    dispatch({
      type: action,
      payload: { dropdown: dropdown, option: option },
    });
  };

  return (
    <>
      <input
        type="radio"
        id={`${dropdown}-${option}`}
        name={dropdown}
        onChange={() => handleDropdownChange(action, dropdown, option)}
        checked={appState[dropdown] === option}
      />
      <label htmlFor={`${dropdown}-${option}`} className="capitalize">
        {option}
      </label>
    </>
  );
};

export default DetailtsFilterOption;
