import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';

const ScrollToTopBtn = () => {
  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <a href="#/" className="scroll-to-top-btn" onClick={scrollToTop}>
      <i>
        <AiOutlineArrowUp />
      </i>
    </a>
  );
};

export default ScrollToTopBtn;
