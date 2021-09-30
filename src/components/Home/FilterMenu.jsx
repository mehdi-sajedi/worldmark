import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import useComponentInvisible from '../../hooks/useComponentInvisible';
import FilterRegion from './FilterRegion';

const regions = ['africa', 'americas', 'asia', 'europe', 'oceania'];
const sortCategories = [
  {
    text: 'Name: A to Z',
    id: 'nameAZ',
  },

  {
    text: 'Name: Z to A',
    id: 'nameZA',
  },

  {
    text: 'Population: High to Low',
    id: 'popHL',
  },

  {
    text: 'Population: Low to High',
    id: 'popLH',
  },

  {
    text: 'Area: High to Low',
    id: 'areaHL',
  },

  {
    text: 'Area: Low to High',
    id: 'areaLH',
  },
];

const FilterMenu = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { ref: filterMenuRef } = useComponentInvisible('CLOSE-FILTER-MENU');

  const handleSortSelect = (e) => {
    dispatch({
      type: 'SET-SORT-TYPE',
      payload: e.target.id,
    });
  };

  const handleCountriesSlider = (e) => {
    dispatch({ type: 'SET-COUNTRIES-PER-PAGE', payload: e.target.value });
  };

  return (
    <div
      ref={filterMenuRef}
      className={`filter-menu ${appState.menuOpen && 'filter-open'} ${
        appState.filterMenuExtraHeight && 'extra-height'
      }`}
    >
      <h3 className="filter-heading main">Filter | Sort</h3>
      <div className="line"></div>
      <h3 className="region-heading">Regions</h3>
      <div className="filter-categories">
        <div className="filter-category region-category">
          <div className="options">
            {regions.map((region, idx) => {
              return <FilterRegion region={region} key={region} idx={idx} />;
            })}
          </div>
        </div>
      </div>
      <div className="line"></div>
      <h3 className="sort-heading">Sort by</h3>
      <div className="sort-categories">
        {sortCategories.map((item) => {
          return (
            <p
              onClick={(e) => handleSortSelect(e)}
              id={item.id}
              key={item.id}
              className={`${appState.sortBy === item.id ? 'sort-active' : ''}`}
            >
              {item.text}
            </p>
          );
        })}
      </div>
      <div className="line"></div>
      <h3 className="countries-heading">Countries / Page</h3>
      <div className="countries-per-page">
        <h4 className="countries-per-page-value">
          {appState.countriesPerPage}
        </h4>
        <input
          type="range"
          className="countries-per-page-input"
          tabIndex="-1"
          min="12"
          max="84"
          value={appState.countriesPerPage}
          onChange={(e) => handleCountriesSlider(e)}
        />
      </div>
    </div>
  );
};

export default FilterMenu;
