import { Navigate } from "react-router-dom";
import * as http from "./httpService";

const register = (user, setError, handleSuccess) => {
  http
    .post("/register", user)
    .then((response) => {
      if (response.status === 200) {
        handleSuccess("User is registered successfully !!!!!");
        setInterval(() => {
          window.location.assign("/login");
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      setError(error.response.data.error);
    });
};

export default register;
