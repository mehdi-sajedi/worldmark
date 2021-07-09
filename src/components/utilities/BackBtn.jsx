import React from 'react';
import { useHistory } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackBtn = () => {
  const history = useHistory();

  return (
    <button onClick={() => history.goBack()} className="back-btn">
      <BsArrowLeft className="back-btn__arrow" />
      <span className="back-btn__text">Back</span>
    </button>
  );
};

export default BackBtn;
