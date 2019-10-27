import React, { useState } from "react";
//ROUTER
import { Link, navigate } from "@reach/router";
//RECAPTCHA
import Recaptcha from "react-recaptcha";
//REDUX
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//ACTION
import { login } from "../../../actions/session/session.action";
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
//CSS
import "./RegisterForm.scss";
const useStyles = makeStyles({
  button: {
    backgroundColor: "#49c5b6",
    height: 56,
    marginBottom: 20,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#42AB9E"
    }
  }
});
import axios from "axios";

const RegisterForm = props => {
  const { login } = props;
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [valueUserName, setValueUserName] = useState(null);
  const [valueEmail, setValueEmail] = useState(null);
  const [valuePassword, setValuePassword] = useState(null);

  const classes = useStyles();
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
        <TextField
          id="outlined-username"
          label="Username"
          margin="normal"
          variant="outlined"
          onChange={e => setValueUserName(e.target.value)}
        />
        <TextField
          id="outlined-email-input"
          label="Email"
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
        <TextField
          id="outlined-repear-password-input"
          label="Repeat Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
          onChange={e => console.log(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
              value="checked"
            />
          }
          label="I accept the Terms and Conditions and Privacy Policy"
        />
        {/* <Recaptcha
          sitekey="6LfFZ78UAAAAAPXiYUjev99uZFVgPH3PdIbrs8lj"
          render="explicit"
          className="g-recaptcha"
          onloadCallback={() => console.log("1")}
        /> */}
        <Button
          variant="contained"
          className={classes.button}
          onClick={() =>
            axios
              .post(
                "http://localhost:3000/register",
                {
                  username: valueUserName,
                  email: valueEmail,
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
            "CREATE YOUR ACCOUNT"
          )}
        </Button>
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
)(RegisterForm);
