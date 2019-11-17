import React from "react";
import { sessionService } from "redux-react-session";
import { Avatar, Badge, Tabs } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faCommentDots,
  faUser,
  faUserFriends,
  faEnvelope,
  faCog
} from "@fortawesome/free-solid-svg-icons";
import "./LeftMenu.scss";

const { TabPane } = Tabs;

const TabsData = [
  {
    title: "message",
    icon: (
      <FontAwesomeIcon
        icon={faCommentDots}
        className="message_btn_icon tab_btn_icon"
        size="lg"
        color="#A6B5C2"
      />
    )
  },
  {
    title: "user",
    icon: (
      <FontAwesomeIcon
        icon={faUser}
        className="user_btn_icon tab_btn_icon"
        size="lg"
        color="#A6B5C2"
      />
    )
  },
  {
    title: "user_friends",
    icon: (
      <FontAwesomeIcon
        icon={faUserFriends}
        className="user_friends_btn_icon tab_btn_icon"
        size="lg"
        color="#A6B5C2"
      />
    )
  },
  {
    title: "envelope",
    icon: (
      <FontAwesomeIcon
        icon={faEnvelope}
        className="envelope_btn_icon tab_btn_icon"
        size="lg"
        color="#A6B5C2"
      />
    )
  },
  {
    title: "cog",
    icon: (
      <FontAwesomeIcon
        icon={faCog}
        className="cog_btn_icon tab_btn_icon"
        size="lg"
        color="#A6B5C2"
      />
    )
  }
];

const LeftMenu = ({ activeTabLeftMenu, setActiveTabLeftMenu, user }) => {
  return (
    <div className="LeftMenuLayout">
      <div className="avatar">
        <Badge dot color="#54D48B" offset={[-8, 50]}>
          <Avatar
            size={60}
            style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            {user && user.username
              ? user.username.toUpperCase().split("", 1)[0]
              : ""}
          </Avatar>
        </Badge>
      </div>
      <div className="tabsLayout">
        <Tabs
          activeKey={activeTabLeftMenu}
          tabPosition="left"
          onChange={key => setActiveTabLeftMenu(key)}
        >
          {TabsData.map(tab => {
            return (
              <TabPane tab={tab.icon} key={tab.title}>
                {null}
              </TabPane>
            );
          })}
        </Tabs>
      </div>
      <div className="logout">
        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="signout_btn_icon"
          color="#A6B5C2"
          onClick={() => sessionService.deleteSession()}
        />
      </div>
    </div>
  );
};
export default LeftMenu;
