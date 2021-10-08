import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';

const ActiveSortText = () => {
  const { appState } = useContext(AppContext);
  return (
    <p style={{ marginBottom: '1.5rem' }}>
      Sorted by: <span>{appState.sortBy.text}</span>
    </p>
  );
};

export default ActiveSortText;
