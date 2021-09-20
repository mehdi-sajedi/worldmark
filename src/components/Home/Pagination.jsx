import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';

const Pagination = () => {
  const { appState, dispatch } = useContext(AppContext);
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil(appState.totalCountries.length / appState.countriesPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const handlePaginate = (pageNum) => {
    dispatch({
      type: 'SET-CURRENT-PAGE',
      payload: {
        page: pageNum,
        idxFirst:
          pageNum * appState.countriesPerPage - appState.countriesPerPage,
        idxLast: Math.min(
          pageNum * appState.countriesPerPage,
          appState.totalCountries.length
        ),
      },
    });
  };

  return (
    <div className="country-pages">
      <ul>
        {pageNumbers.map((pageNum) => {
          return (
            <li
              key={pageNum}
              className={`${
                pageNum === appState.currentPage ? 'active-page' : ''
              } `}
            >
              <a href="#/" onClick={() => handlePaginate(pageNum)}>
                {pageNum}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
