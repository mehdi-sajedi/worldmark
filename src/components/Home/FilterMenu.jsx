import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import useComponentInvisible from '../../hooks/useComponentInvisible';
// import useComponentDragged from '../../hooks/useComponentDragged';
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
];

const FilterMenu = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { ref: filterMenuRef } = useComponentInvisible('CLOSE-FILTER-MENU');
  // const { ref: dragLineRef } = useComponentDragged(null, 50);

  const handleSortSelect = (e) => {
    dispatch({
      type: 'SET-SORT-TYPE',
      payload: e.target.id,
    });
  };

  const handleCountriesSlider = (e) => {
    dispatch({ type: 'SET-COUNTRIES-PER-PAGE', payload: e.target.value });
  };

  // const handleUnMemberToggle = (status) => {
  //   dispatch({ type: 'SET-UN-MEMBER', payload: status });
  // };

  return (
    <div
      ref={filterMenuRef}
      className={`filter-menu ${appState.menuOpen && 'filter-open'} ${
        appState.filterMenuExtraHeight && 'extra-height'
      }`}
    >
      {/* <div ref={dragLineRef} className="drag-line-wrapper">
        <div className="drag-line"></div>
      </div> */}
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
      {/* <div className="line no-mb"></div>
      <div className="other-filters">
        <h4>UN Member</h4>
        <div className="un-filter">
          <input
            type="radio"
            name="un-member"
            id="un-yes"
            // checked={appState.unMember}
            onChange={() => handleUnMemberToggle(true)}
          />
          <label htmlFor="un-yes">Yes</label>
          <input
            type="radio"
            name="un-member"
            id="un-no"
            // checked={appState.unMember}
            onChange={() => handleUnMemberToggle(false)}
          />
          <label htmlFor="un-no">No</label>
        </div>

        <h4>Landlocked</h4>
        <div className="landlocked-filter">
          <input type="radio" name="landlocked" id="landlocked-yes" />
          <label htmlFor="landlocked-yes">Yes</label>
          <input type="radio" name="landlocked" id="landlocked-no" />
          <label htmlFor="landlocked-no">No</label>
        </div>
      </div> */}
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
