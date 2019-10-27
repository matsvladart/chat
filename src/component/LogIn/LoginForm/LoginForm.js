import React, { useState } from "react";
//ROUTER
import { Link } from "@reach/router";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//ACTION
import { login } from "../../../actions/session/session.action";
//AXIOS
import axios from "axios";
//MaterialUI
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//Component
import SocialBtn from "../SocialBtn/SocialBtn";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#49c5b6",
    height: 56,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#42AB9E"
    }
  }
});

const LoginForm = props => {
  const { login } = props;

  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valueEmail, setValueEmail] = useState(null);
  const [valuePassword, setValuePassword] = useState(null);

  const classes = useStyles();

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
        <TextField
          id="outlined-email-input"
          label="Email or Username"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
          onChange={e => setValueEmail(e.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          onChange={e => setValuePassword(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              value="checked"
            />
          }
          label="Keep me logged in"
        />
        <Button
          variant="contained"
          className={classes.button}
          onClick={() =>
            axios
              .post(
                "http://localhost:3000/login",
                {
                  username: valueEmail,
                  password: valuePassword
                },
                {
                  onUploadProgress: () => setLoading(true),
                  onDownloadProgress: () => setLoading(false)
                }
              )
              .then(function(res) {
                if (res.data._id) {
                  login(res.data);
                } else {
                  console.log(res.data);
                }
              })
              .catch(function(error) {
                console.log(error);
              })
          }
        >
          {loading ? (
            <CircularProgress style={{ color: "#fff" }} />
          ) : (
            "LOGIN NOW"
          )}
        </Button>
        <p className="forgotPass">
          <a href="#">Forgot your password</a>
        </p>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
