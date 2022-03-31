import { useEffect, useRef, useCallback, useState } from 'react';

const useShowComponent = () => {
  const ref = useRef(null);
  const [showComponent, setShowComponent] = useState(false);

  const handleClickOutside = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setShowComponent(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { ref, showComponent, setShowComponent };
};

export default useShowComponent;
