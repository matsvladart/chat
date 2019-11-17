import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Tooltip, Button, Icon, Badge, Avatar } from "antd";
import { Modal } from "antd-mobile";

const AddNewChatMobile = props => {
  const { data, setData, user } = props;

  const [users, setUsers] = useState([]);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 1; i++) {
      arr.push(i);
    }
    setUsers(arr);
  }, []);

  return (
    <React.Fragment>
      <Tooltip
        title="Click to create a new chat"
        arrowPointAtCenter={true}
        placement="topLeft"
        visible={data.length === 0 ? true : false}
        defaultVisible={data.length === 0 ? true : false}
        overlayClassName="new_chat_tooltip"
      >
        <Button
          type="primary"
          shape="circle"
          icon="plus"
          className="new_chat_btn"
          onClick={() => setVisible(true)}
        ></Button>
      </Tooltip>
      <Modal
        visible={visible}
        transparent
        maskClosable={false}
        wrapClassName="add_new_chat_modal"
      >
        <div className="modal_content">
          {users.map(item => (
            <div className="item" key={item}>
              <Badge dot color="#54D48B" offset={[-11, 60]}>
                <Avatar
                  size={70}
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  {user && user.username
                    ? user.username.toUpperCase().split("", 1)[0]
                    : ""}
                </Avatar>
              </Badge>
            </div>
          ))}
        </div>
        <Icon
          type="close-circle"
          className="close_modal_btn"
          onClick={() => setVisible(false)}
        />
      </Modal>
    </React.Fragment>
  );
};
const mapStateToProps = ({ homePageReducer, sessionReducer }) => {
  return {
    activeTabLeftMenu: homePageReducer.activeTabLeftMenu,
    user: sessionReducer.user
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewChatMobile);
