import * as types from "../actions/action.constant";
const initialState = {
  activeTabLeftMenu: "message"
};

export const homePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_TAB_LEFT_MENU:
      return { ...state, activeTabLeftMenu: action.payload };
    default:
      return state;
  }
};

// case types.SET_YEAR_PENDING:
//       return { ...state, fetching: true };
//     case types.SET_YEAR_FULFILLED:
//       return { ...state, fetching: false, data: action.payload };
//     case types.SET_YEAR_REJECTED:
//       return { ...state, fetching: false, data: [], error: true };
