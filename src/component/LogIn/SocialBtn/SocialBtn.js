import React from "react";
//MaterialUI
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
//ICON
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGooglePlay,
  faTwitter,
  faFacebook
} from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles({
  buttonG: {
    backgroundColor: "#D64C3F",
    width: 135,
    height: 50,
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(214, 76, 63, 0.8);"
    }
  },
  buttonT: {
    backgroundColor: "#25B6E6",
    width: 135,
    height: 50,
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(37, 182, 230, 0.8);"
    }
  },
  buttonF: {
    backgroundColor: "#325595",
    width: 135,
    height: 50,
    color: "#fff",
    "&:hover": {
      backgroundColor: "rgba(50, 85, 149, 0.8);"
    }
  }
});

const SocialBtn = () => {
  const classes = useStyles();
  return (
    <div className="social_link">
      <Button variant="contained" className={classes.buttonG}>
        <FontAwesomeIcon icon={faGooglePlay} className="social_btn_icon" />
        Google
      </Button>
      <Button variant="contained" className={classes.buttonT}>
        <FontAwesomeIcon icon={faTwitter} className="social_btn_icon" />
        Twitter
      </Button>
      <Button variant="contained" className={classes.buttonF}>
        <FontAwesomeIcon icon={faFacebook} className="social_btn_icon" />
        Facebook
      </Button>
    </div>
  );
};
export default SocialBtn;
