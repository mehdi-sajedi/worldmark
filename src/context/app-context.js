import React, { createContext } from 'react';
import { useImmerReducer } from 'use-immer';

export const AppContext = createContext();

export const AppProvider = (props) => {
  const initialFilterState = {
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
      america: {
        id: 'america',
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
    }

    if (action.type === 'TOGGLE-SUB-REGION-CHECK') {
      draft.regions[action.payload[0]].subRegions[action.payload[1]] =
        !draft.regions[action.payload[0]].subRegions[action.payload[1]];
    }
  };

  const [filterState, dispatch] = useImmerReducer(reducer, initialFilterState);

  return (
    <AppContext.Provider value={[filterState, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
};
