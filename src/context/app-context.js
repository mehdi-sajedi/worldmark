import React, { createContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { enableMapSet } from 'immer';
enableMapSet();

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initialAppState = {
    filterActive: false,
    searchActive: false,
    activeRegions: new Set(),
    activeSubRegions: new Set(),
    searchMatches: [],
    animationSet: true,
    darkMode: false,
    isLoading: false,
    countries: [],
    inputText: '',
    currentCountries: [],
    numCountriesShown: 12,
    menuOpen: false,
    minPopulation: 0,
    maxPopulation: 9999999999,
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

      // Left off trying to make search dropdown close when clicked outside
      // Left off trying to make search dropdown close when clicked outside
      // Left off trying to make search dropdown close when clicked outside


      if (
        action.payload.inputValue.length > 1 &&
        document.activeElement === action.payload.inputRef
      )
        draft.searchActive = true;
      else draft.searchActive = false;
    }

    if (action.type === 'SET-ALL-COUNTRIES') {
      draft.countries = action.payload;
    }

    if (action.type === 'SET-CURRENT-COUNTRIES') {
      draft.currentCountries = draft.countries.slice(
        0,
        draft.numCountriesShown
      );
    }

    if (action.type === 'SET-CURRENT-COUNTRIES-MATCH') {
      if (draft.filterActive) {
        let activeRegions = [...draft.activeRegions];
        let activeSubRegions = [...draft.activeSubRegions];
        draft.currentCountries = action.payload.filter((country) => {
          return (
            activeRegions.includes(country.region.toLowerCase()) ||
            activeSubRegions.includes(country.subregion.toLowerCase())
          );
        });
      } else draft.currentCountries = action.payload;
    }

    if (action.type === 'SET-NUM-COUNTRIES-SHOWN') {
      draft.numCountriesShown = action.payload;
    }

    if (action.type === 'SORT-POPULATION-DESCENDING') {
      draft.currentCountries = action.payload;
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
        draft.currentCountries = draft.countries.filter((country) => {
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
      } else
        draft.currentCountries = draft.countries.filter((country) => {
          return (
            country.name.toLowerCase().includes(draft.inputText.trim()) ||
            country.alpha2Code.toLowerCase().includes(draft.inputText.trim()) ||
            country.alpha3Code.toLowerCase().includes(draft.inputText.trim())
          );
        });
    }

    if (action.type === 'TOGGLE-SUB-REGION-CHECK') {
      draft.regions[action.payload[0]].subRegions[action.payload[1]].selected =
        !draft.regions[action.payload[0]].subRegions[action.payload[1]]
          .selected;

      if (draft.regions[action.payload[0]].selected) {
        draft.regions[action.payload[0]].selected = false;
      }

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
        draft.currentCountries = draft.countries.filter((country) => {
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
      } else
        draft.currentCountries = draft.countries.filter((country) => {
          return (
            country.name.toLowerCase().includes(draft.inputText.trim()) ||
            country.alpha2Code.toLowerCase().includes(draft.inputText.trim()) ||
            country.alpha3Code.toLowerCase().includes(draft.inputText.trim())
          );
        });
    }

    if (action.type === 'CLOSE-ANIMATION') {
      draft.animationSet = false;
    }

    if (action.type === 'ATTACH-ANIMATION') {
      draft.animationSet = true;
    }

    if (action.type === 'SEARCH-MATCHES') {
      draft.searchMatches = draft.countries.filter((country) => {
        return (
          country.name.toLowerCase().includes(draft.inputText.trim()) ||
          country.alpha2Code.toLowerCase().includes(draft.inputText.trim()) ||
          country.alpha3Code.toLowerCase().includes(draft.inputText.trim())
        );
      });
    }
  };

  const [appState, dispatch] = useImmerReducer(reducer, initialAppState);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
