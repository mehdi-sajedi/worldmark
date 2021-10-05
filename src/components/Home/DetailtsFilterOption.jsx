import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';

const DetailtsFilterOption = ({ kind, value }) => {
  const { appState, dispatch } = useContext(AppContext);

  const handleDropdownChange = (kind, value) => {
    dispatch({
      type: 'SET-FILTER-DETAILS-DROPDOWN-SELECTION',
      payload: { kind: kind, value: value },
    });
  };

  return (
    <>
      <input
        type="radio"
        id={`${kind}-${value}`}
        name={kind}
        onChange={() => handleDropdownChange(kind, value)}
        checked={appState[kind] === value}
      />
      <label htmlFor={`${kind}-${value}`} className="capitalize">
        {value}
      </label>
    </>
  );
};

export default DetailtsFilterOption;
