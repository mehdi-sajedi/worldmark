import { useState, useEffect, useRef } from 'react';

const useComponentInvisible = (init) => {
  const [isComponentInvisible, setIsComponentInvisible] = useState(init);
  const ref = useRef(null);

  const handleHideDropdown = (e) => {
    if (e.key === 'Escape') {
      setIsComponentInvisible(true);
    }
  };

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentInvisible(true);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentInvisible, setIsComponentInvisible };
};

export default useComponentInvisible;
