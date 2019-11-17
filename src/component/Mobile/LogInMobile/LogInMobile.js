import React from "react";

import LoginMobileForm from "./LoginMobileForm/LoginMobileForm";
import RegisterMobileForm from "./RegisterMobileForm/RegisterMobileForm";

import "./LogInMobile.scss";

const LogInMobile = props => {
  return (
    <div className="login_mobile_layout">
      <div className="mask"></div>
      <div className="content">
        <div className="title">
          <h1>My Chat</h1>
        </div>
        {props.match.url === "/login" ? (
          <LoginMobileForm />
        ) : (
          <RegisterMobileForm />
        )}
      </div>
    </div>
  );
};
export default LogInMobile;
