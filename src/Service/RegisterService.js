import * as http from "./httpService"

const register = (user) => {
    http
      .post("/register", user)
      .then((response) => {
        console.log(response);
      })
      .catch(() => {
        console.log("error");
      });
}

export default register;