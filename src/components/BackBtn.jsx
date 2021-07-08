import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackBtn = () => {
  return (
    <div className="back-btn">
      <Link className="back-btn__link" to="/">
        <BsArrowLeft className="back-btn__link__arrow" />
        <span className="back-btn__link__text">Back</span>
      </Link>
    </div>
  );
};

export default BackBtn;
