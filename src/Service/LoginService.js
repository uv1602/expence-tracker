import * as http from "./httpService"
const login = (user) => {
    http
      .post("/login", user)
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        console.log("error");
      });
}

export default login;