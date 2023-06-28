import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("access_token");
    return tokenString;
  };

  const getUser = () => {
    const user = localStorage.getItem("user");
    return user;
  };

  const [token, setToken] = useState(getToken());
  const [user, setUser] = useState(getUser());

  const saveToken = (userToken) => {
    localStorage.setItem("access_token", JSON.stringify(userToken));
    setToken(userToken);
  };

  const logout = () => {
    setToken("");
    setUser({});
  };

  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return {
    logout,
    setToken: saveToken,
    token,
    user,
    setUser: saveUser,
  };
}
