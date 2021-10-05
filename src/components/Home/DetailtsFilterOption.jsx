import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';

const DetailtsFilterOption = ({ kind, value, action }) => {
  const { appState, dispatch } = useContext(AppContext);

  const handleDropdownChange = (action, kind, value) => {
    dispatch({
      type: action,
      payload: { kind: kind, value: value, test: null },
    });
  };

  return (
    <>
      <input
        type="radio"
        id={`${kind}-${value}`}
        name={kind}
        onChange={() => handleDropdownChange(action, kind, value)}
        checked={appState[kind] === value}
      />
      <label htmlFor={`${kind}-${value}`} className="capitalize">
        {value}
      </label>
    </>
  );
};

export default DetailtsFilterOption;
