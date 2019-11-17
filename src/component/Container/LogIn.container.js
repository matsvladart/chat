import React from "react";

import device from "current-device";
import { screenType } from "../../constant/screen.constant";

import LogIn from "../Desctop/LogIn/LogIn";
import LoginMobile from "../Mobile/LogInMobile/LogInMobile";

const LoginContainer = props => {
  switch (device.type) {
    case screenType.DESKTOP:
      return <LogIn {...props} />;
    case screenType.MOBILE:
      return <LoginMobile {...props} />;
  }
};

export default LoginContainer;
