import React, { useState } from "react";
import { Form, Spin, Button, Input, Icon, Checkbox } from "antd";
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

const NormalRegisterForm = props => {
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
    <div className="form_register">
      <div className="header">
        <div style={{ color: "#fff", alignSelf: "flex-start" }}>
          Register with:
        </div>
        <div className="facebook_layout">
          <FontAwesomeIcon icon={faFacebook} />
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <div style={{ color: "#fff" }}>Or with your E-mail:</div>
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
              prefix={<Icon type="user" />}
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
              prefix={<Icon type="mail" />}
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
              prefix={<Icon type="lock" />}
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
              prefix={<Icon type="lock" />}
              size="large"
              style={{ height: 60 }}
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="signUp_btn"
          >
            {loading ? (
              <Spin className="loadLoginSpin" size="large" />
            ) : (
              "CREATE YOUR ACCOUNT"
            )}
          </Button>
          <p className="terms">
            <Link to="#">Terms of Service</Link>
          </p>
        </Form.Item>
      </Form>
      <Link to="/login">
        <Button type="primary" ghost size="large" className="login_btn">
          Are you a member? Login now
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

const RegisterMobileForm = Form.create({ name: "register_mobile_form" })(
  NormalRegisterForm
);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterMobileForm);
