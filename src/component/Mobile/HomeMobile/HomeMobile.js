import React, { useState } from "react";

import { sessionService } from "redux-react-session";

import { TabBar, ListView } from "antd-mobile";

import {
  UserFriendsIcon,
  UserFriendsFilledIcon,
  ChatBotIcon,
  ChatBotFilledIcon,
  ProfileIcon,
  ProfileFilledIcon,
  SettingsIcon,
  SettingsFilledIcon,
  MessageIcon,
  MessageFilledIcon
} from "./svgIcons";

import MessageMobile from "./MessageMobile/MessageMobile";
import ChatBotMobile from "./ChatBotMobile/ChatBotMobile";
import FriendsMobile from "./FriendsMobile/FriendsMobile";
import ProfileMobile from "./ProfileMobile/ProfileMobile";
import SettingsMobile from "./SettingsMobile/SettingsMobile.js";

import "./HomeMobile.scss";

const HomeMobile = () => {
  const [selectedTab, setSelectedTab] = useState("messageTab");

  const renderContent = page => {
    // switch (selectedTab) {
    //   case "messageTab":
    //     return <MessageMobile />;
    // }
  };
  return (
    // <div>
    //   <h1>Mobile</h1>
    //   <button onClick={() => sessionService.deleteSession()}>EXIT</button>
    // </div>
    <div
      style={{ position: "fixed", height: "100%", width: "100%", top: 0 }}
      className="TabBarLayout"
    >
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#49c5b6"
        barTintColor="#3f4953"
      >
        <TabBar.Item
          title="Chat Bot"
          key="Chat_Bot"
          icon={<ChatBotIcon color={"rgb(148, 148, 148)"} />}
          selectedIcon={<ChatBotFilledIcon color={"#49c5b6"} />}
          selected={selectedTab === "chatBotTab"}
          onPress={() => setSelectedTab("chatBotTab")}
          data-seed="logId"
        >
          <ChatBotMobile />
        </TabBar.Item>
        <TabBar.Item
          icon={<UserFriendsIcon color={"rgb(148, 148, 148)"} />}
          selectedIcon={<UserFriendsFilledIcon color={"#49c5b6"} />}
          title="Friends"
          key="Friends"
          selected={selectedTab === "friendsTab"}
          onPress={() => setSelectedTab("friendsTab")}
        >
          <FriendsMobile />
        </TabBar.Item>
        <TabBar.Item
          icon={<MessageIcon color={"rgb(148, 148, 148)"} />}
          selectedIcon={<MessageFilledIcon color={"#49c5b6"} />}
          title="Message"
          key="Message"
          selected={selectedTab === "messageTab"}
          onPress={() => setSelectedTab("messageTab")}
          data-seed="logId1"
        >
          <MessageMobile />
        </TabBar.Item>
        <TabBar.Item
          icon={<ProfileIcon color={"rgb(148, 148, 148)"} />}
          selectedIcon={<ProfileFilledIcon color={"#49c5b6"} />}
          title="Profile"
          key="profile"
          selected={selectedTab === "profileTab"}
          onPress={() => setSelectedTab("profileTab")}
        >
          <ProfileMobile />
        </TabBar.Item>
        <TabBar.Item
          icon={<SettingsIcon color={"rgb(148, 148, 148)"} />}
          selectedIcon={<SettingsFilledIcon color={"#49c5b6"} />}
          title="Setting"
          key="setting"
          selected={selectedTab === "settingTab"}
          onPress={() => setSelectedTab("settingTab")}
        >
          <SettingsMobile />
        </TabBar.Item>
      </TabBar>
    </div>
  );
};
export default HomeMobile;
