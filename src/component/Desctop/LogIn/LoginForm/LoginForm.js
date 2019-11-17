import React, { useState } from "react";
//ROUTER
import { Link, useHistory } from "react-router-dom";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//ACTION
import { login } from "../../../../actions/session/session.action";
//AXIOS
import axios from "axios";
//MaterialUI
import { Form, Icon, Input, Button, Checkbox, Spin } from "antd";
//Component
import SocialBtn from "../SocialBtn/SocialBtn";

import "./LoginForm.scss";

const NormalLoginForm = props => {
  let history = useHistory();
  const { getFieldDecorator } = props.form;
  // const { login } = props;

  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        axios
          .post(
            "https://chatmatsypura.herokuapp.com/login",
            {
              username: values.username,
              password: values.password
            },
            {
              onUploadProgress: () => setLoading(true),
              onDownloadProgress: () => setLoading(false)
            }
          )
          .then(function(res) {
            if (res.data._id) {
              props.login(res.data, history);
            } else {
              setValidateErrorField(res.data.message);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    });
  };

  const setValidateErrorField = message => {
    props.form.setFields({
      username: {
        value: "",
        errors: [new Error("")]
      },
      password: {
        value: "",
        errors: [new Error(message)]
      }
    });
  };

  return (
    <div className="main">
      <div className="header">
        <span>Sign in to continue</span>
        <span>
          Not a member yet?
          <strong>
            <Link to="/register">Register now</Link>
          </strong>
        </span>
      </div>
      <div className="input">
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please input your username or email!"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="E-mail or Username"
                size="large"
                style={{ height: 60 }}
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
                size="large"
                style={{ height: 60 }}
              />
            )}
          </Form.Item>
          <Form.Item>
            <div
              style={{
                marginBottom: 25
              }}
            >
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Keep me logged in</Checkbox>)}
            </div>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              size="large"
              style={{ width: "100%", height: 60, marginBottom: 5 }}
            >
              {loading ? (
                <Spin className="loadLoginSpin" size="large" />
              ) : (
                "LOGIN NOW"
              )}
            </Button>
            <p className="forgotPass">
              <Link to="#">Forgot your password</Link>
            </p>
          </Form.Item>
        </Form>
      </div>
      <div className="main_bottom">
        <div className="bottom_header">Or sign in with:</div>
        <SocialBtn />
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
const LoginForm = Form.create({ name: "normal_login" })(NormalLoginForm);

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
