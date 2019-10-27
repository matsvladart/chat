import React from "react";

import { Router, Redirect } from "@reach/router";

import { sessionService } from "redux-react-session";

import Home from "./component/Home/Home";
import Header from "./component/Header/Header";
import About from "./component/About/About";
import LogIn from "./component/LogIn/LogIn";

export default (
  //   <React.Fragment>
  //     <Header />
  <Router>
    <Home path="/" />
    <About path="about" />
    <LogIn path="login" />
    <LogIn path="register" />
  </Router>
  //   </React.Fragment>
);
