import React from "react";

import Home from "../Desctop/Home/Home";
import HomeMobile from "../Mobile/HomeMobile/HomeMobile";

import device from "current-device";
import { screenType } from "../../constant/screen.constant";

const HomeContainer = props => {
  switch (device.type) {
    case screenType.DESKTOP:
      return <Home {...props} />;
    case screenType.MOBILE:
      return <HomeMobile {...props} />;
  }
};

export default HomeContainer;
