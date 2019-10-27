import { combineReducers } from "redux";
import { pageReducer } from "./page.reducer";
import { sessionReducer } from "redux-react-session";

export const rootReducer = combineReducers({
  pageReducer,
  sessionReducer
});
