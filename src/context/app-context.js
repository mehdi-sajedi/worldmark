import React, { createContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { enableMapSet } from 'immer';
enableMapSet();

export const AppContext = createContext();

export const AppProvider = (props) => {
  const initialAppState = {
    filterActive: false,
    activeRegions: new Set(),
    activeSubRegions: new Set(),
    // - ************************
    darkMode: false,
    isLoading: false,
    countries: [],
    inputText: '',
    currentCountries: [],
    numCountriesShown: 12,
    // - ************************
    menuOpen: false,
    minPopulation: 0,
    maxPopulation: 9999999999,
    regions: {
      africa: {
        id: 'africa',
        expanded: false,
        selected: false,
        subRegions: {
          af_n: false,
          af_s: false,
          af_w: false,
          af_e: false,
          af_m: false,
        },
      },
      americas: {
        id: 'americas',
        expanded: false,
        selected: false,
        subRegions: {
          am_n: false,
          am_s: false,
          am_c: false,
          carib: false,
        },
      },
      asia: {
        id: 'asia',
        expanded: false,
        selected: false,
        subRegions: {
          as_w: false,
          as_e: false,
          as_c: false,
          as_s: false,
          as_se: false,
        },
      },
      europe: {
        id: 'europe',
        expanded: false,
        selected: false,
        subRegions: {
          eu_n: false,
          eu_s: false,
          eu_w: false,
          eu_e: false,
        },
      },
      oceania: {
        id: 'oceania',
        expanded: false,
        selected: false,
        subRegions: {
          aus_nz: false,
          mel: false,
          mic: false,
          pol: false,
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
      draft.inputText = action.payload;
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
      draft.currentCountries = action.payload;
    }

    if (action.type === 'SET-NUM-COUNTRIES-SHOWN') {
      draft.numCountriesShown = action.payload;
    }

    if (action.type === 'SORT-POPULATION-DESCENDING') {
      draft.currentCountries = action.payload;
    }

    // - ************************
    // - ************************
    // - ************************

    if (action.type === 'TOGGLE-FILTER-MENU') {
      draft.menuOpen = !draft.menuOpen;
    }

    if (action.type === 'TOGGLE-SUB-REGIONS-MENU') {
      // Object.values(draft.regions).forEach((r) => {
      //   if (r.id === action.payload) r.expanded = !r.expanded;
      //   if (r.expanded && r.id !== action.payload) r.expanded = !r.expanded;
      // });
      draft.regions[action.payload].expanded =
        !draft.regions[action.payload].expanded;
    }

    if (action.type === 'TOGGLE-REGION-CHECK') {
      draft.regions[action.payload].selected =
        !draft.regions[action.payload].selected;

      if (draft.regions[action.payload].selected) {
        for (let i in draft.regions[action.payload].subRegions)
          draft.regions[action.payload].subRegions[i] = false;
      }

      Object.values(draft.regions).some((region) => {
        if (region.selected) return (draft.filterActive = true);
        else return (draft.filterActive = false);
      });

      Object.values(draft.regions).forEach((region) => {
        if (region.selected) draft.activeRegions.add(region.id);
        else {
          draft.activeRegions.delete(region.id);
        }
      });

      if (draft.filterActive) {
        draft.currentCountries = draft.countries.filter((country) => {
          let actives = [...draft.activeRegions];
          return actives.includes(country.region.toLowerCase()) && country;
        });
      } else draft.currentCountries = draft.countries;
    }

    if (action.type === 'TOGGLE-SUB-REGION-CHECK') {
      draft.regions[action.payload[0]].subRegions[action.payload[1]] =
        !draft.regions[action.payload[0]].subRegions[action.payload[1]];

      if (draft.regions[action.payload[0]].selected) {
        draft.regions[action.payload[0]].selected = false;
      }

      Object.values(draft.regions).some((region) => {
        if (region.selected) return (draft.filterActive = true);
        else return (draft.filterActive = false);
      });

      Object.values(draft.regions).forEach((region) => {
        if (region.selected) draft.activeRegions.add(region.id);
        else {
          draft.activeRegions.delete(region.id);
        }
      });

      
    


      if (draft.filterActive) {
        draft.currentCountries = draft.countries.filter((country) => {
          let actives = [...draft.activeRegions];
          return actives.includes(country.region.toLowerCase()) && country;
        });
      } else draft.currentCountries = draft.countries;
    }
  };

  const [appState, dispatch] = useImmerReducer(reducer, initialAppState);

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};
