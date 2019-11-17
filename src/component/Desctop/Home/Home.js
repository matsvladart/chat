import React, { useState } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setActiveTabLeftMenu } from "../../../actions/home/homePage.action";
import LeftMenu from "./LeftMenu/LeftMenu";
import LeftMenuContent from "./LeftMenuContent/LeftMenuContent";
import Chat from "./Chat/Chat";
import "./Home.scss";

const Home = props => {
  const [uploadImg, setUploadImage] = useState(null);

  return (
    <div className="mainLayout">
      <LeftMenu
        user={props.user}
        activeTabLeftMenu={props.activeTabLeftMenu}
        setActiveTabLeftMenu={props.setActiveTabLeftMenu}
      />
      <LeftMenuContent
        activeTabLeftMenu={props.activeTabLeftMenu}
        user={props.user}
      />
      <Chat />
    </div>
  );
};

const mapStateToProps = ({ homePageReducer, sessionReducer }) => {
  return {
    activeTabLeftMenu: homePageReducer.activeTabLeftMenu,
    user: sessionReducer.user
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setActiveTabLeftMenu }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
