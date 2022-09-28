import Logout from "../components/Logout/Logout";
import jwt from "jwt-decode";
import { reset, verification } from "./Password";

const getCurrentAuthUser = (setUser) => {
  try {
    const token = localStorage.getItem("token");
    const user = jwt(token);
    setUser(user);
  } catch (error) {
    <Logout />;
  }
};

const isLoginStatus = (SetIsLogin) => {
  if (localStorage.getItem("token")) {
    SetIsLogin(true);
  } else {
    SetIsLogin(false);
  }
};

const setLogin = (token) => {
  localStorage.setItem("token", token);
  window.location.assign("/login");
};

const updateToken = (token) => {
  localStorage.setItem("token", token);
};

const setCurrentAuthUser = (setUser, token) => {
  try {
    const user = jwt(token);
    setUser(user);
  } catch (error) {
    console.log(error);
  }
};

const updatePassword = async (password, token, setError, handleSuccess) => {
  try {
    console.log(token);
    const user = await jwt(token);
    reset(user, password, setError, handleSuccess);
  } catch (error) {
    console.log(error);
  }
};

const verify = async (token, setError, handleSuccess) => {
  try {
    console.log(token);
    const user = await jwt(token);
    verification(user, setError, handleSuccess);
  } catch (error) {
    console.log(error);
    setError("***Some thing wrong !!! Please try again ");
  }
};

export {
  getCurrentAuthUser,
  isLoginStatus,
  setLogin,
  updateToken,
  setCurrentAuthUser,
  updatePassword,
  verify,
};
