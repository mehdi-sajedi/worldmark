import React, { createContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { enableMapSet } from 'immer';
enableMapSet();

export const AppContext = createContext();

// Try searching "options" for filter icon in react-icons and google icons
// If using the API, filter the response to only fetch the data you need.

export const AppProvider = ({ children }) => {
  const initialAppState = {
    countries: [],
    currentCountries: [],
    totalCountries: [],
    activeRegions: new Set(),
    activeSubRegions: new Set(),
    inputText: '',
    searchMatches: [],
    sortBy: 'nameAZ',
    countriesPerPage: 36,
    currentPage: 1,
    currentPageFirstPost: 0,
    currentPageLastPost: 36,
    numCountriesShown: 12,
    filterActive: false,
    showSearchDropdown: false,
    menuOpen: false,
    darkMode: false,
    isLoading: false,
    regions: {
      africa: {
        id: 'africa',
        expanded: false,
        selected: false,
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
    function sortCountries() {
      if (draft.sortBy === 'popHL') {
        draft.totalCountries = draft.totalCountries.sort(
          (a, b) => b.population - a.population
        );
      }
      if (draft.sortBy === 'popLH') {
        draft.totalCountries = draft.totalCountries.sort(
          (a, b) => a.population - b.population
        );
      }
      if (draft.sortBy === 'nameAZ') {
        draft.totalCountries = draft.totalCountries.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (draft.sortBy === 'nameZA') {
        draft.totalCountries = draft.totalCountries.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
    }

    // - *************************************************************
    // - *************************************************************
    // - *************************************************************

    function toggleFilterCheck() {
      Object.values(draft.regions).forEach((region) => {
        if (region.selected) draft.activeRegions.add(region.id);
        else {
          draft.activeRegions.delete(region.id);
        }
      });

      Object.values(draft.regions).forEach((region) => {
        Object.values(region.subRegions).forEach((subregion) => {
          if (subregion.selected) draft.activeSubRegions.add(subregion.id);
          else draft.activeSubRegions.delete(subregion.id);
        });
      });

      if (draft.activeRegions.size > 0 || draft.activeSubRegions.size > 0) {
        draft.filterActive = true;
      } else draft.filterActive = false;

      if (draft.filterActive) {
        draft.totalCountries = draft.countries.filter((country) => {
          let activeRegions = [...draft.activeRegions];
          let activeSubRegions = [...draft.activeSubRegions];
          return (
            (activeRegions.includes(country.region.toLowerCase()) ||
              activeSubRegions.includes(country.subregion.toLowerCase())) &&
            (country.name.toLowerCase().includes(draft.inputText.trim()) ||
              country.alpha2Code
                .toLowerCase()
                .includes(draft.inputText.trim()) ||
              country.alpha3Code
                .toLowerCase()
                .includes(draft.inputText.trim())) &&
            country
          );
        });
      } else {
        draft.totalCountries = draft.countries.filter((country) => {
          return (
            country.name.toLowerCase().includes(draft.inputText.trim()) ||
            country.alpha2Code.toLowerCase().includes(draft.inputText.trim()) ||
            country.alpha3Code.toLowerCase().includes(draft.inputText.trim())
          );
        });
      }

      showCurrentPageCountries();
    }

    function showCurrentPageCountries() {
      draft.currentCountries = draft.totalCountries.slice(
        draft.currentPageFirstPost,
        draft.currentPageLastPost
      );
    }

    // - *************************************************************
    // - *************************************************************
    // - *************************************************************

    if (action.type === 'TOGGLE-DARK') {
      draft.darkMode = !draft.darkMode;
      localStorage.setItem('darkmode', JSON.stringify(draft.darkMode));
    }
    if (action.type === 'TOGGLE-LOADING') {
      draft.isLoading = !draft.isLoading;
    }

    if (action.type === 'GET-DARK-STORAGE') {
      draft.darkMode = JSON.parse(localStorage.getItem('darkmode'));
    }

    if (action.type === 'SET-INPUT-TEXT') {
      draft.inputText = action.payload.inputValue;

      // if (
      //   action.payload.inputValue.length > 1 &&
      //   document.activeElement === action.payload.inputRef
      // )

      if (action.payload.inputValue.length > 1) draft.showSearchDropdown = true;
      else draft.showSearchDropdown = false;
    }

    if (action.type === 'SET-ALL-COUNTRIES') {
      draft.countries = action.payload;
      draft.totalCountries = action.payload;
    }

    if (action.type === 'SET-CURRENT-COUNTRIES') {
      draft.currentCountries = draft.totalCountries.slice(
        action.payload.idxFirst,
        action.payload.idxLast
      );
    }

    if (action.type === 'SET-CURRENT-COUNTRIES-MATCH') {
      if (draft.filterActive) {
        let activeRegions = [...draft.activeRegions];
        let activeSubRegions = [...draft.activeSubRegions];
        draft.totalCountries = action.payload.filter((country) => {
          return (
            activeRegions.includes(country.region.toLowerCase()) ||
            activeSubRegions.includes(country.subregion.toLowerCase())
          );
        });
      } else {
        draft.totalCountries = action.payload;
      }
      showCurrentPageCountries();
    }

    if (action.type === 'SET-NUM-COUNTRIES-SHOWN') {
      draft.numCountriesShown = action.payload;
    }

    if (action.type === 'TOGGLE-FILTER-MENU') {
      draft.menuOpen = !draft.menuOpen;
    }

    if (action.type === 'TOGGLE-SUB-REGIONS-MENU') {
      draft.regions[action.payload].expanded =
        !draft.regions[action.payload].expanded;
    }

    if (action.type === 'TOGGLE-REGION-CHECK') {
      draft.regions[action.payload].selected =
        !draft.regions[action.payload].selected;

      if (draft.regions[action.payload].selected) {
        for (let i in draft.regions[action.payload].subRegions)
          draft.regions[action.payload].subRegions[i].selected = false;
      }

      toggleFilterCheck();
      sortCountries();
    }

    if (action.type === 'TOGGLE-SUB-REGION-CHECK') {
      draft.regions[action.payload[0]].subRegions[action.payload[1]].selected =
        !draft.regions[action.payload[0]].subRegions[action.payload[1]]
          .selected;

      if (draft.regions[action.payload[0]].selected) {
        draft.regions[action.payload[0]].selected = false;
      }

      toggleFilterCheck();
      sortCountries();
    }

    if (action.type === 'SEARCH-MATCHES') {
      draft.searchMatches = draft.countries.filter((country) => {
        return (
          country.name
            .toLowerCase()
            .includes(draft.inputText.toLowerCase().trim()) ||
          country.alpha2Code
            .toLowerCase()
            .includes(draft.inputText.toLowerCase().trim()) ||
          country.alpha3Code
            .toLowerCase()
            .includes(draft.inputText.toLowerCase().trim())
        );
      });
    }

    if (action.type === 'CLEAR-SEARCH') {
      draft.inputText = '';
      action.payload.focus();
    }

    if (action.type === 'CLOSE-SEARCH-DROPDOWN') {
      draft.showSearchDropdown = false;
    }

    if (action.type === 'SET-CURRENT-PAGE') {
      draft.currentPage = action.payload.page;
      draft.currentPageFirstPost = action.payload.idxFirst;
      draft.currentPageLastPost = action.payload.idxLast;
    }

    if (action.type === 'RESET-TO-FIRST-PAGE') {
      draft.currentPage = 1;
      draft.currentPageFirstPost = 0;
      draft.currentPageLastPost = Math.min(
        draft.countriesPerPage,
        draft.totalCountries.length
      );
    }

    if (action.type === 'SET-SORT') {
      draft.sortBy = action.payload;

      sortCountries();
      showCurrentPageCountries();
    }
  };

  const [appState, dispatch] = useImmerReducer(reducer, initialAppState);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
