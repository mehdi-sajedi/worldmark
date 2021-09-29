import { useContext, useEffect, useRef, useCallback } from 'react';
import { AppContext } from '../context/app-context';

const useComponentInvisible = (reducerAction) => {
  const { appState, dispatch } = useContext(AppContext);
  const ref = useRef(null);

  const handleEscapeKeyPress = useCallback(
    (e) => {
      if (e.key === 'Escape') dispatch({ type: reducerAction });
    },
    [dispatch, reducerAction]
  );

  const handleClickOutside = useCallback(
    (e) => {
      console.log('Ran');
      if (ref.current && !ref.current.contains(e.target)) {
        dispatch({ type: reducerAction });
      }
    },
    [dispatch, reducerAction]
  );

  useEffect(() => {
    if (!appState.menuOpen) return;
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('keydown', handleEscapeKeyPress, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscapeKeyPress, true);
    };
  }, [handleClickOutside, handleEscapeKeyPress, appState.menuOpen]);

  return { ref };
};

export default useComponentInvisible;
