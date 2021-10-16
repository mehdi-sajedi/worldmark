import React, { createContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { enableMapSet } from 'immer';
enableMapSet();

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialAppState = {
    countries: [],
    currentPageCountries: [],
    allPagesCountries: [],
    activeRegions: new Set(),
    activeSubRegions: new Set(),
    searchText: '',
    searchMatches: [],
    sortBy: {
      id: 'popHL',
      text: 'Population: High to Low',
    },
    unMember: 'all',
    landlocked: 'all',
    driveSide: 'all',
    countriesPerPage: 36,
    currentPage: 1,
    currentPageFirstPost: 0,
    currentPageLastPost: 36,
    filterActive: false,
    showSearchDropdown: false,
    menuOpen: false,
    regions: {
      africa: {
        id: 'africa',
        expanded: false,
        selected: false,
        atleastOneSubRegionActive: false,
        subRegions: {
          af_n: {
            id: 'northern africa',
            selected: false,
          },
          af_s: {
            id: 'southern africa',
            selected: false,
          },
          af_w: {
            id: 'western africa',
            selected: false,
          },
          af_e: {
            id: 'eastern africa',
            selected: false,
          },
          af_m: {
            id: 'middle africa',
            selected: false,
          },
        },
      },
      americas: {
        id: 'americas',
        expanded: false,
        selected: false,
        atleastOneSubRegionActive: false,
        subRegions: {
          am_n: {
            id: 'northern america',
            selected: false,
          },
          am_s: {
            id: 'south america',
            selected: false,
          },
          am_c: {
            id: 'central america',
            selected: false,
          },
          carib: {
            id: 'caribbean',
            selected: false,
          },
        },
      },
      asia: {
        id: 'asia',
        expanded: false,
        selected: false,
        atleastOneSubRegionActive: false,
        subRegions: {
          as_w: {
            id: 'western asia',
            selected: false,
          },
          as_e: {
            id: 'eastern asia',
            selected: false,
          },
          as_c: {
            id: 'central asia',
            selected: false,
          },
          as_s: {
            id: 'southern asia',
            selected: false,
          },
          as_se: {
            id: 'south-eastern asia',
            selected: false,
          },
        },
      },
      europe: {
        id: 'europe',
        expanded: false,
        selected: false,
        atleastOneSubRegionActive: false,
        subRegions: {
          eu_n: {
            id: 'northern europe',
            selected: false,
          },
          eu_s: {
            id: 'southern europe',
            selected: false,
          },
          eu_w: {
            id: 'western europe',
            selected: false,
          },
          eu_e: {
            id: 'eastern europe',
            selected: false,
          },
        },
      },
      oceania: {
        id: 'oceania',
        expanded: false,
        selected: false,
        atleastOneSubRegionActive: false,
        subRegions: {
          aus_nz: {
            id: 'australia and new zealand',
            selected: false,
          },
          mel: {
            id: 'melanesia',
            selected: false,
          },
          mic: {
            id: 'micronesia',
            selected: false,
          },
          pol: {
            id: 'polynesia',
            selected: false,
          },
        },
      },
    },
  };

  const reducer = (draft, action) => {
    // - *************************************************************
    // - FUNCTIONS
    // - *************************************************************
    function sortCountries() {
      if (draft.sortBy.id === 'popHL') {
        draft.allPagesCountries = draft.allPagesCountries.sort(
          (a, b) => b.population - a.population
        );
      } else if (draft.sortBy.id === 'popLH') {
        draft.allPagesCountries = draft.allPagesCountries.sort(
          (a, b) => a.population - b.population
        );
      } else if (draft.sortBy.id === 'nameAZ') {
        draft.allPagesCountries = draft.allPagesCountries.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      } else if (draft.sortBy.id === 'nameZA') {
        draft.allPagesCountries = draft.allPagesCountries.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      } else if (draft.sortBy.id === 'areaHL') {
        draft.allPagesCountries = draft.allPagesCountries.sort(
          (a, b) => b.area - a.area
        );
      } else if (draft.sortBy.id === 'areaLH') {
        draft.allPagesCountries = draft.allPagesCountries.sort(
          (a, b) => a.area - b.area
        );
      }
    }

    function toggleFilterCheck() {
      Object.values(draft.regions).forEach((region) => {
        if (region.selected) draft.activeRegions.add(region.id);
        else draft.activeRegions.delete(region.id);
      });

      Object.values(draft.regions).forEach((region) => {
        Object.values(region.subRegions).forEach((subregion) => {
          if (subregion.selected) draft.activeSubRegions.add(subregion.id);
          else draft.activeSubRegions.delete(subregion.id);
        });
      });

      if (draft.activeRegions.size === 0 && draft.activeSubRegions.size === 0) {
        populateActiveRegions();
      }

      checkFilterActive();
    }

    function showCurrentPageCountries() {
      draft.currentPageCountries = draft.allPagesCountries.slice(
        draft.currentPageFirstPost,
        draft.currentPageLastPost
      );
    }

    function searchMatches(country, alpha2Code, alpha3Code, val) {
      return (
        matchByCountryIdentifier(country, val) ||
        matchByCountryIdentifier(alpha2Code, val) ||
        matchByCountryIdentifier(alpha3Code, val)
      );
    }

    function matchByCountryIdentifier(countryIdentifier, val) {
      return countryIdentifier.toLowerCase().includes(val.toLowerCase().trim());
    }

    function setFilteredCountries(arr = draft.countries) {
      if (draft.searchText !== '') arr = draft.searchMatches;

      checkFilterActive();

      // if (!draft.filterActive) return (draft.allPagesCountries = arr);

      let activeRegions = [...draft.activeRegions];
      let activeSubRegions = [...draft.activeSubRegions];

      draft.allPagesCountries = arr
        .filter((country) => {
          return (
            activeRegions.includes(country.region.toLowerCase()) ||
            activeSubRegions.includes(country.subregion.toLowerCase())
          );
        })
        .filter((country) => {
          if (draft.unMember === 'yes') return country.unMember;
          else if (draft.unMember === 'no') return !country.unMember;
          else return country;
        })
        .filter((country) => {
          if (draft.landlocked === 'yes') return country.landlocked;
          else if (draft.landlocked === 'no') return !country.landlocked;
          else return country;
        })
        .filter((country) => {
          if (draft.driveSide === 'all') return country;
          else return country.driveSide === draft.driveSide;
        });
    }

    function populateActiveRegions() {
      draft.countries.forEach((country) => {
        draft.activeRegions.add(country.region.toLowerCase());
      });
      draft.countries.forEach((country) => {
        draft.activeSubRegions.add(country.subregion.toLowerCase());
      });
    }

    function checkFilterActive() {
      if (
        draft.activeRegions.size > 0 ||
        draft.activeSubRegions.size > 0 ||
        draft.unMember === 'yes' ||
        draft.unMember === 'no' ||
        draft.landlocked === 'yes' ||
        draft.landlocked === 'no' ||
        draft.driveSide === 'left' ||
        draft.driveSide === 'right'
      ) {
        draft.filterActive = true;
      } else draft.filterActive = false;
    }

    // - *************************************************************
    // - ACTIONS
    // - *************************************************************

    if (action.type === 'GET-DARK-STORAGE') {
      draft.darkMode = JSON.parse(localStorage.getItem('darkmode'));
    } else if (action.type === 'TOGGLE-DARK-MODE') {
      draft.darkMode = !draft.darkMode;
      localStorage.setItem('darkmode', JSON.stringify(draft.darkMode));
    } else if (action.type === 'SET-ALL-COUNTRIES') {
      draft.countries = action.payload;
      draft.allPagesCountries = action.payload;
      populateActiveRegions();
    } else if (action.type === 'SET-CURRENT-COUNTRIES') {
      draft.currentPageCountries = draft.allPagesCountries.slice(
        draft.currentPageFirstPost,
        draft.currentPageLastPost
      );
    } else if (action.type === 'SET-SEARCH-TEXT') {
      draft.searchText = action.payload;
      if (action.payload.length > 1) draft.showSearchDropdown = true;
      else draft.showSearchDropdown = false;
    } else if (action.type === 'FILTER-BY-SEARCH') {
      setFilteredCountries();
      showCurrentPageCountries();
    } else if (action.type === 'SET-ONLY-SEARCH-MATCHES') {
      draft.searchMatches = draft.countries.filter((country) => {
        return searchMatches(
          country.name,
          country.alpha2Code,
          country.alpha3Code,
          draft.searchText
        );
      });
    } else if (action.type === 'CLEAR-SEARCH') {
      draft.searchText = '';
      action.payload.focus();
    } else if (action.type === 'CLOSE-SEARCHBAR-DROPDOWN') {
      draft.showSearchDropdown = false;
    } else if (action.type === 'TOGGLE-FILTER-MENU') {
      draft.menuOpen = !draft.menuOpen;
    } else if (action.type === 'CLOSE-FILTER-MENU') {
      draft.menuOpen = false;
    } else if (action.type === 'TOGGLE-REGION-CHECK') {
      const region = draft.regions[action.payload];

      region.selected = !region.selected;

      if (region.selected) {
        for (let i in region.subRegions) region.subRegions[i].selected = false;
      }

      region.atleastOneSubRegionActive = false;

      toggleFilterCheck();
      setFilteredCountries();
      sortCountries();
    } else if (action.type === 'TOGGLE-SUB-REGION-CHECK') {
      const parentRegion = draft.regions[action.payload.region];

      parentRegion.subRegions[action.payload.initials].selected =
        !parentRegion.subRegions[action.payload.initials].selected;

      parentRegion.selected = false;

      const subRegions = parentRegion.subRegions;
      parentRegion.atleastOneSubRegionActive = Object.values(subRegions).some(
        (sub) => {
          return sub.selected;
        }
      );

      toggleFilterCheck();
      setFilteredCountries();
      sortCountries();
    } else if (action.type === 'TOGGLE-SUB-REGIONS-MENU') {
      draft.regions[action.payload].expanded =
        !draft.regions[action.payload].expanded;
    } else if (action.type === 'SET-CURRENT-PAGE') {
      draft.currentPage = action.payload.page;
      draft.currentPageFirstPost = action.payload.idxFirst;
      draft.currentPageLastPost = action.payload.idxLast;
    } else if (action.type === 'RESET-TO-FIRST-PAGE') {
      draft.currentPage = 1;
      draft.currentPageFirstPost = 0;
      draft.currentPageLastPost = Math.min(
        draft.countriesPerPage,
        draft.allPagesCountries.length
      );
    } else if (action.type === 'SET-SORT-TYPE') {
      draft.sortBy = action.payload;
      showCurrentPageCountries();
      sortCountries();
    } else if (action.type === 'SET-UN-MEMBER-FILTER') {
      draft.unMember = action.payload.option;
      setFilteredCountries();
      sortCountries();
    } else if (action.type === 'SET-LANDLOCKED-FILTER') {
      draft.landlocked = action.payload.option;
      setFilteredCountries();
      sortCountries();
    } else if (action.type === 'SET-DRIVE-SIDE-FILTER') {
      draft.driveSide = action.payload.option;
      setFilteredCountries();
      sortCountries();
    } else if (action.type === 'SET-COUNTRIES-PER-PAGE') {
      draft.currentPage = 1;
      draft.currentPageFirstPost = 0;
      draft.countriesPerPage = action.payload;
      draft.currentPageLastPost = Math.min(
        draft.countriesPerPage,
        draft.allPagesCountries.length
      );
    } else if (action.type === 'RESET-FILTERS') {
      return initialAppState;
    }
  };

  const [appState, dispatch] = useImmerReducer(reducer, initialAppState);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
