import React from "react";
//IMG
import bg_image from "../../../../static/img/log_in_back.jpg";
//Component
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";
//CSS
import "./LogIn.scss";

const LogIn = props => {
  return (
    <div className="login">
      <div className="login_pictures">
        <img src={bg_image} alt="login_chat" />
      </div>
      <div className="login_form">
        <div className="title">Welcom to my chat</div>
        {props.match.url === "/login" ? <LoginForm /> : <RegisterForm />}
        <div className="bottom">
          © 2019 Chat. All rights reserved.
          <br />
          By signing up, I agree to Chat's
          <br />
          <strong>
            <a href="#">Terms of Service</a>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
