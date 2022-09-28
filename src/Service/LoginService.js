import * as http from "./httpService";
const login = (email, password) => {
  const user = {
    email,
    password,
  };
  return http
    .post("/login", user)
    .then((response) => {
      return response;
    })
    .catch((error) => {});
};

export default login;
