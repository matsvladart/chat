import { sessionService } from "redux-react-session";
import { navigate } from "@reach/router";

export const login = user => {
  return () => {
    const id = user._id;
    sessionService.saveSession({ id });
    sessionService.saveUser(user);
    navigate("/");
  };
};
