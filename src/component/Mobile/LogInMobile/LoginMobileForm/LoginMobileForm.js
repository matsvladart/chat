import React, { useState } from "react";
import { Form, Spin, Button, Input, Icon } from "antd";
import { Link, useHistory } from "react-router-dom";
//AXIOS
import axios from "axios";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//ACTION
import { login } from "../../../../actions/session/session.action";
//ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlay,
  faTwitter,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";

const NormalLoginForm = props => {
  let history = useHistory();
  const { getFieldDecorator } = props.form;
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
    <div className="form_login">
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
                <Icon type="user" style={{ color: "#fff", fontSize: 20 }} />
              }
              placeholder="E-mail or Username"
              size="large"
              style={{ height: 60 }}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input.Password
              prefix={
                <Icon type="lock" style={{ color: "#fff", fontSize: 20 }} />
              }
              type="password"
              placeholder="Password"
              size="large"
              style={{ height: 60 }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            className="logIn_btn"
          >
            {loading ? (
              <Spin className="loadLoginSpin" size="large" />
            ) : (
              "LOGIN NOW"
            )}
          </Button>
          <p className="forgot">
            <Link to="#">Forgot password</Link>
          </p>
        </Form.Item>
      </Form>
      <div className="social_login">
        <p>Or login using:</p>
        <div className="facebook_layout">
          <FontAwesomeIcon icon={faFacebook} />
        </div>
      </div>
      <Link to="/register">
        <Button type="primary" ghost size="large" className="signUp_btn">
          Don't have an Account? Sign Up
        </Button>
      </Link>
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

const LoginMobileForm = Form.create({ name: "login_mobile_form" })(
  NormalLoginForm
);

export default connect(mapStateToProps, mapDispatchToProps)(LoginMobileForm);
