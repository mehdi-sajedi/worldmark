import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import useComponentInvisible from '../../hooks/useComponentInvisible';
import FilterRegion from './FilterRegion';

const regions = ['africa', 'americas', 'asia', 'europe', 'oceania'];
const sortCategories = [
  {
    text: 'Population: High to Low',
    id: 'popHL',
  },
  {
    text: 'Population: Low to High',
    id: 'popLH',
  },
  {
    text: 'Name: A to Z',
    id: 'nameAZ',
  },
  {
    text: 'Name: Z to A',
    id: 'nameZA',
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
      className={`filter-menu ${appState.menuOpen && 'filter-open'}
  }`}
    >
      <div className="filter-block">
        <h3 className="filter-heading main section-heading">Filter | Sort</h3>
      </div>
      <div className="filter-content">
        <h3 className="mobile-only section-heading filter-heading main">
          Filter | Sort
        </h3>
        <div className="line mobile-only"></div>
        <h3 className="section-heading region-heading">Regions</h3>
        <div className="filter-category">
          <div className="options">
            {regions.map((region, idx) => {
              return <FilterRegion region={region} key={region} idx={idx} />;
            })}
          </div>
        </div>
        <div className="line"></div>
        <h3 className="section-heading sort-heading">Sort by</h3>
        <div className="sort-categories">
          {sortCategories.map((item) => {
            return (
              <p
                onClick={(e) => handleSortSelect(e)}
                id={item.id}
                key={item.id}
                className={`${
                  appState.sortBy === item.id ? 'sort-active' : ''
                }`}
              >
                {item.text}
              </p>
            );
          })}
        </div>
        <div className="line"></div>
        <h3 className="section-heading countries-heading">Countries / Page</h3>
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
    </div>
  );
};

export default FilterMenu;
