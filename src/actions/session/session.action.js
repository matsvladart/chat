import { sessionService } from "redux-react-session";

export const login = (user, history) => {
  return () => {
    const id = user.id;
    sessionService.saveSession({ id });
    sessionService.saveUser(user);
    history.push("/");
  };
};
