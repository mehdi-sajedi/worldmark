import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import ReactDom from 'react-dom';

const Overlay = () => {
  const { appState } = useContext(AppContext);
  return ReactDom.createPortal(
    <div className={` ${appState.menuOpen ? 'overlay' : ''}`}></div>,
    document.getElementById('overlay')
  );
};

export default Overlay;
