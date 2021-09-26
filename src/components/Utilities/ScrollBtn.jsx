import React from 'react';
import { ImArrowDown2 } from 'react-icons/im';

const ScrollBtn = () => {
  const scrollToBottom = () => {
    document.documentElement.scrollTo({
      top: document.body.offsetHeight,
      behavior: 'smooth',
    });
  };

  return (
    <a href="#/" className="scroll-btn" onClick={scrollToBottom}>
      <ImArrowDown2 className="arrow-up" />
    </a>
  );
};

export default ScrollBtn;
