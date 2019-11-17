import React, { useRef } from "react";
import { Form, Input, Button, Icon } from "antd";

import { uniqId } from "../../../../../Utill/utill";

const MESSAGE = "message-";

const SendSvg = () => {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      p-id="2672"
      width="40"
      height="40"
    >
      <path
        d="M478.4128 491.7248l-202.1376-30.1056a81.92 81.92 0 0 1-64.67584-52.38784L125.52192 178.4832c-7.8848-21.17632 2.49856-44.8512 23.22432-52.92032a39.38304 39.38304 0 0 1 31.90784 1.47456L878.592 475.15648c19.90656 9.9328 28.18048 34.48832 18.432 54.82496-3.8912 8.21248-10.40384 14.848-18.432 18.8416L180.6336 896.96256a39.77216 39.77216 0 0 1-53.6576-18.8416 41.7792 41.7792 0 0 1-1.45408-32.58368l86.07744-230.74816a81.92 81.92 0 0 1 64.67584-52.38784l202.1376-30.1056a20.48 20.48 0 0 0 0-40.5504z"
        p-id="2673"
      ></path>
    </svg>
  );
};

const InputForm = props => {
  const userID = props.user.id;
  const inputRef = useRef(null);

  const { getFieldDecorator, resetFields } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const isEmptyMessage = values.message.replace(/\s/g, "").length === 0;
        if (!isEmptyMessage) {
          props.socket.emit("chat message", {
            id: uniqId(MESSAGE),
            ownerId: userID,
            date: new Date(),
            text: values.message
          });
        } else {
          inputRef.current.focus();
        }
      } else {
        inputRef.current.focus();
      }
    });
    resetFields("message");
  };

  return (
    <Form layout="inline" onSubmit={handleSubmit} className="input_form">
      <Form.Item className="input_field">
        {getFieldDecorator("message", {
          rules: [
            { required: true, message: <div className={{ display: "none" }} /> }
          ]
        })(
          <Input
            ref={inputRef}
            placeholder="Type something to send..."
            size="large"
          />
        )}
      </Form.Item>
      <Button htmlType="submit" className="btn_submit">
        <Icon component={SendSvg} />
      </Button>
    </Form>
  );
};

const WrappedInputForm = Form.create({ name: "input_form" })(InputForm);

export default WrappedInputForm;
