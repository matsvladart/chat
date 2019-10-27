import { createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers";
import logger from "redux-logger";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import { sessionService } from "redux-react-session";

export const store = createStore(
  rootReducer,
  applyMiddleware(promise, thunk, logger)
);

sessionService.initSessionService(store, { driver: "COOKIES" });
