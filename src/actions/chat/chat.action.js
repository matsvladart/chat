import * as types from "../action.constant";

export const setMessage = data => {
  return {
    type: types.SET_MESSAGE,
    payload: data
  };
};
export const setMessageDb = data => {
  return {
    type: types.SET_MESSAGE_DB,
    payload: data
  };
};
