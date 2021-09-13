import React from 'react';
import { useHistory } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackBtn = ({ setIsLoading }) => {
  const history = useHistory();

  const runn = () => {
    setIsLoading((prev) => !prev);
    history.goBack();
  };

  return (
    <button onClick={runn} className="btn btn-back">
      <BsArrowLeft className="btn-back__arrow" />
      <span className="btn-back__text">Back</span>
    </button>
  );
};

export default BackBtn;
