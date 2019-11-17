import * as types from "../action.constant";
// import axios from "axios";

export const setActiveTabLeftMenu = data => {
  return {
    type: types.SET_ACTIVE_TAB_LEFT_MENU,
    payload: data
  };
};
