import React, { useState } from "react";

import { Input, Button, List, Avatar, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./LeftMenuContent.scss";
const { Paragraph } = Typography;
const CogMenuTab = () => {
  return <h1>Cog</h1>;
};

const EnvelopeMenuTab = () => {
  return <h1>Envelope</h1>;
};

const UserFriendsMenuTab = () => {
  return <h1>USER FRIEND</h1>;
};

const UserMenuTab = () => {
  return <h1>USER</h1>;
};

const MessageMenuTab = () => {
  const [data, setData] = useState([
    {
      title: "Alina Judy",
      message: "I miss you call me please"
    },
    {
      title: "Sara Moira",
      message: "I miss you call me please"
    },
    {
      title: "Christina Lynn",
      message: "I miss you call me please"
    },
    {
      title: "Chris Marina",
      message: "I miss you call me please"
    },
    {
      title: "Marguerite Rose",
      message: "I miss you call me please"
    }
  ]);

  return (
    <div className="message">
      <div className="header">
        <Input
          placeholder="Search"
          size="large"
          //   onSearch={value => console.log(value)}
          style={{ width: 220 }}
          className="message_search"
          suffix={null}
          prefix={
            <FontAwesomeIcon
              icon={faSearch}
              className="search_btn_icon tab_btn_icon"
              size="lg"
              color="#A6B5C2"
            />
          }
        />
        <Button type="primary" shape="circle" icon="plus"></Button>
      </div>
      <div className="body">
        <List
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Avatar size={50}>A</Avatar>
              <div className="text">
                <div className="name">{item.title}</div>
                <div className="message">
                  <Paragraph ellipsis>{item.message}</Paragraph>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

const LeftMenuContent = ({ activeTabLeftMenu }) => {
  let component;
  switch (activeTabLeftMenu) {
    case "message":
      component = <MessageMenuTab />;
      break;
    case "user":
      component = <UserMenuTab />;
      break;
    case "user_friends":
      component = <UserFriendsMenuTab />;
      break;
    case "envelope":
      component = <EnvelopeMenuTab />;
      break;
    case "cog":
      component = <CogMenuTab />;
      break;
    default:
      component = null;
      break;
  }
  return <div className="leftMenuContent">{component}</div>;
};

export default LeftMenuContent;
