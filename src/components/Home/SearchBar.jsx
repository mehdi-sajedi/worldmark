import React, { useContext, useRef, useEffect } from 'react';
import { HiSearch } from 'react-icons/hi';
import { AppContext } from '../../context/app-context';
import { RiCloseFill } from 'react-icons/ri';

const SearchBar = () => {
  const { appState, dispatch } = useContext(AppContext);
  const inputRef = useRef();

  useEffect(() => {
    dispatch({ type: 'SET-ONLY-SEARCH-MATCHES' });
  }, [dispatch, appState.searchText]);

  const countriesFilter = (e) => {
    dispatch({
      type: 'SET-SEARCH-TEXT',
      payload: e.target.value,
    });

    const timeout = setTimeout(() => {
      dispatch({ type: 'FILTER-BY-SEARCH' });
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const clearSearch = (e) => {
    if (e.type === 'click' || e.code === 'Enter') {
      dispatch({
        type: 'CLEAR-SEARCH',
        payload: inputRef.current,
      });
      dispatch({
        type: 'SET-SEARCH-TEXT',
        payload: '',
      });
      dispatch({ type: 'FILTER-BY-SEARCH' });
    }
  };

  return (
    <div className='search-bar'>
      <div className='search-bar__input'>
        <i className='search-bar__input__icon'>
          <HiSearch />
        </i>
        <input
          className='search-bar__input__text'
          type='text'
          placeholder='Search for a country'
          onChange={(e) => countriesFilter(e)}
          value={appState.searchText}
          ref={inputRef}
        />
        <RiCloseFill
          onClick={clearSearch}
          onKeyPress={(e) => clearSearch(e)}
          tabIndex={0}
          className={`search-close-icon ${
            appState.searchText.length > 0 ? 'show-close' : ''
          }`}
        />
      </div>
    </div>
  );
};

export default SearchBar;
