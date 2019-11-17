import * as types from "../actions/action.constant";

const initialState = {
  message: []
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_MESSAGE:
      return { ...state, message: [...state.message, action.payload] };
    case types.SET_MESSAGE_DB:
      return { ...state, message: [...state.message, ...action.payload] };
    default:
      return state;
  }
};
