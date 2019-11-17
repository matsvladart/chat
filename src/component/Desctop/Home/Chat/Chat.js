import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setMessage, setMessageDb } from "../../../../actions/chat/chat.action";
import io from "socket.io-client";
import "./Chat.scss";
import WrappedInputForm from "./InputForm/InputForm.jsx";
import { Avatar, Typography } from "antd";
import moment from "moment";
import { uniqId } from "../../../../Utill/utill";
const { Paragraph } = Typography;
const socket = io("https://chatmatsypura.herokuapp.com/");
import axios from "axios";
const MESSAGE = "message";

const messageRender = (item, i, user) => {
  const userMessage = (
    <div className="user_message" key={item.id}>
      <Avatar
        size={60}
        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
      >
        {user && user.username
          ? user.username.toUpperCase().split("", 1)[0]
          : ""}
      </Avatar>
      <div className="message_body">
        <div className="message_text">
          <Paragraph>{item.text}</Paragraph>
        </div>
        <div className="message_date">
          {moment(item.date).format("DD[-]MM LT")}
        </div>
      </div>
    </div>
  );

  const myMessage = (
    <div className="my_message" key={item.id}>
      <div className="message_body">
        <div className="message_text">
          <Paragraph>{item.text}</Paragraph>
        </div>
        <div className="message_date">
          {moment(item.date).format("DD[-]MM LT")}
        </div>
      </div>
      <Avatar
        size={60}
        style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
      >
        {user && user.username
          ? user.username.toUpperCase().split("", 1)[0]
          : ""}
      </Avatar>
    </div>
  );

  const component = item.ownerId === user.id ? myMessage : userMessage;

  return component;
};

const Chat = props => {
  const messageRef = useRef(null);

  useEffect(() => {
    axios.get("https://chatmatsypura.herokuapp.com/message").then(res => {
      props.setMessageDb(res.data);
    });
  }, []);

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, [props.message]);

  useEffect(() => {
    socket.on("chat message", msg => {
      props.setMessage(msg);
    });
  }, [socket]);

  return (
    <div className="chatLayout">
      <div className="header"></div>
      <div className="message">
        {props.message.map((item, i) => messageRender(item, i, props.user))}
        <div ref={messageRef} />
      </div>
      <WrappedInputForm socket={socket} user={props.user} />
    </div>
  );
};

const mapStateToProps = store => {
  return {
    message: store.chatReducer.message,
    user: store.sessionReducer.user
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setMessage, setMessageDb }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
