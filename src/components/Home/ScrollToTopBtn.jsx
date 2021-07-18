import React from 'react';
import { IoIosArrowUp } from 'react-icons/io';
// import { AiOutlineArrowUp } from 'react-icons/ai';
// import { BsArrowUpShort } from 'react-icons/bs';
// import { BiUpArrowAlt } from 'react-icons/bi';
// import { MdKeyboardArrowUp } from 'react-icons/md';

const ScrollToTopBtn = () => {
  const scrollToTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <a href="#/" className="scroll-btn" onClick={scrollToTop}>
      <div className="icons">
        <i className="icons-1">
          <IoIosArrowUp />
        </i>
        <i className="icons-2">
          <IoIosArrowUp />
        </i>
      </div>
    </a>
  );
};

export default ScrollToTopBtn;
