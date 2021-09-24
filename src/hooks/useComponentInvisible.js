import { useContext, useEffect, useRef, useCallback } from 'react';
import { AppContext } from '../context/app-context';

const useComponentInvisible = (reducerAction) => {
  const { dispatch } = useContext(AppContext);
  const ref = useRef(null);

  const handleClickOutside = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        dispatch({ type: reducerAction });
      }
    },
    [dispatch, reducerAction]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { ref };
};

export default useComponentInvisible;
