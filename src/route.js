import React from "react";

import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from "react-router-dom";

import { Result, Button } from "antd";

import HomeContainer from "./component/Container/Home.container";
import LoginContainer from "./component/Container/LogIn.container";

const AppRouter = props => {
  return (
    <Router>
      {props.checked && (
        <React.Fragment>
          <Route
            exact
            path="/"
            render={prop =>
              props.authenticated ? (
                React.createElement(HomeContainer, prop)
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: prop.location }
                  }}
                />
              )
            }
          />
          <Route path="/login" component={LoginContainer} />
        </React.Fragment>
      )}
      <Route path="/register" component={LoginContainer} />
    </Router>
  );
};

const NoMatch = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Link to="/">
          <Button type="primary">Back</Button>
        </Link>
      }
    />
  );
};
const mapState = ({ sessionReducer }) => ({
  checked: sessionReducer.checked,
  authenticated: sessionReducer.authenticated
});

export default connect(mapState)(AppRouter);
