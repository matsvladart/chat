import { combineReducers } from "redux";
import { homePageReducer } from "./homePage.reducer";
import { sessionReducer } from "redux-react-session";
import { chatReducer } from "./chat.reducer";

export const rootReducer = combineReducers({
  homePageReducer,
  chatReducer,
  sessionReducer
});
