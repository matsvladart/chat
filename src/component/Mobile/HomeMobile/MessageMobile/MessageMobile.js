import React, { useState, useEffect } from "react";
import { List } from "antd-mobile";
import { Button, Icon, Tooltip } from "antd";

import AddNewChatMobile from "./AddNewChatMobile/AddNewChatMobile";
import "./MessageMobile.scss";

const Item = List.Item;

const MessageMobile = () => {
  const [data, setData] = useState([]);

  return (
    <div className="message_list">
      <div className="header">
        <h1>Message</h1>
        <Icon
          type="search"
          style={{ color: "rgb(148, 148, 148)", fontSize: 20 }}
        />
      </div>
      <div className="body">
        {data.length === 0 ? (
          <div className="no_data">
            <h1>No chats</h1>
          </div>
        ) : (
          data.map(item => <div className="list_item">{item.text}</div>)
        )}
      </div>
      <AddNewChatMobile data={data} setData={setData} />
    </div>
  );
};

export default MessageMobile;
