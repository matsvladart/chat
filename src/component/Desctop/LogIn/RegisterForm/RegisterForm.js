import React, { useState } from "react";
//ROUTER
import { Link, useHistory } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//ACTION
import { login } from "../../../../actions/session/session.action";
//MaterialUI
import { Form, Input, Checkbox, Button, Icon, Spin } from "antd";

//Component
import SocialBtn from "../SocialBtn/SocialBtn";
//CSS
import "./RegisterForm.scss";

import axios from "axios";

const RegisterForm = props => {
  let history = useHistory();
  const { login } = props;
  const { getFieldDecorator } = props.form;

  const [loading, setLoading] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { username, password, email } = values;
        axios
          .post(
            "https://chatmatsypura.herokuapp.com/register",
            {
              username: username,
              email: email,
              password: password
            },
            {
              onUploadProgress: () => setLoading(true),
              onDownloadProgress: () => setLoading(false)
            }
          )
          .then(function(res) {
            if (res.data.id) {
              console.log(res.data);
              login(res.data, history);
            } else {
              setValidateErrorField(res.data.message, values);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    });
  };
  const setValidateErrorField = (message, values) => {
    if (
      message &&
      message === "A user with the given username is already registered"
    )
      props.form.setFields({
        username: {
          value: values.username,
          errors: [new Error(message)]
        }
      });
  };
  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  return (
    <div className="main register">
      <div className="header">
        <span>Register with</span>
        <span>
          Are you a member?
          <strong>
            <Link to="/login">Login now</Link>
          </strong>
        </span>
      </div>
      <div className="main_bottom">
        <SocialBtn />
      </div>
      <div className="input">
        <div className="input_header">Or with your E-mail:</div>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]
            })(
              <Input
                placeholder="Username"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                size="large"
                style={{ height: 60 }}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(
              <Input
                placeholder="E-mail"
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                size="large"
                style={{ height: 60 }}
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(
              <Input.Password
                placeholder="Password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                size="large"
                style={{ height: 60 }}
              />
            )}
          </Form.Item>
          <Form.Item hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(
              <Input.Password
                onBlur={handleConfirmBlur}
                placeholder="Repeat Password"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                size="large"
                style={{ height: 60 }}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("agreement", {
              valuePropName: "checked",
              rules: [
                {
                  required: true,
                  message: "Please checked if your agree with our rules"
                }
              ]
            })(
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%", height: 60 }}
            >
              {loading ? (
                <Spin className="loadLoginSpin" size="large" />
              ) : (
                "CREATE YOUR ACCOUNT"
              )}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = store => {
  return {};
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

const WrappedRegistrationForm = Form.create({ name: "register" })(RegisterForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedRegistrationForm);
