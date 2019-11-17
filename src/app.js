import React from "react";
import ReactDOM from "react-dom";
//Redux
import { Provider } from "react-redux";
import { store } from "./store";
//Router
import AppRouter from "./route";
// CSS
import "./style/main.scss";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
