import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const Pagination = () => {
  const { appState, dispatch } = useContext(AppContext);
  const pageNumbers = [];
  const maxPages = Math.ceil(
    appState.allPagesCountries.length / appState.countriesPerPage
  );

  for (let i = 1; i <= maxPages; i++) {
    pageNumbers.push(i);
  }

  pageNumbers.filter((num) => {
    return appState.currentPage + 2 <= num;
  });

  const handlePaginate = (pageNum) => {
    if (pageNum < 1 || pageNum > maxPages) return;
    dispatch({
      type: 'SET-CURRENT-PAGE',
      payload: {
        page: pageNum,
        idxFirst:
          pageNum * appState.countriesPerPage - appState.countriesPerPage,
        idxLast: Math.min(
          pageNum * appState.countriesPerPage,
          appState.allPagesCountries.length
        ),
      },
    });
  };

  return (
    <div className="pagination">
      <IoIosArrowBack
        onClick={() => handlePaginate(appState.currentPage - 1, 'back')}
        className="arrow arrow-back"
      />
      <div className="country-pages">
        <ul>
          {appState.currentPage >= 3 && (
            <>
              <li
                key={1}
                className={`${
                  1 === appState.currentPage ? 'active-page' : ''
                } `}
              >
                <a href="#/" onClick={() => handlePaginate(1)}>
                  {1}
                </a>
              </li>
              <span className="dots">...</span>
            </>
          )}

          {pageNumbers
            .filter(
              (num) =>
                appState.currentPage + 2 >= num &&
                appState.currentPage - 1 <= num
            )
            .map((pageNum) => {
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

          {appState.currentPage + 2 < maxPages && (
            <>
              <span className="dots">...</span>
              <li
                key={maxPages}
                className={`${
                  maxPages === appState.currentPage ? 'active-page' : ''
                } `}
              >
                <a href="#/" onClick={() => handlePaginate(maxPages)}>
                  {maxPages}
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
      <IoIosArrowForward
        onClick={() => handlePaginate(appState.currentPage + 1, 'forward')}
        className="arrow arrow-forward"
      />
    </div>
  );
};

export default Pagination;
