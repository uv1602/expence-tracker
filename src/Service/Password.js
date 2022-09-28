// /api/profile/forgot

import { Password } from "@mui/icons-material";
import * as http from "./httpService";

const Forget = (user, setError, handleSuccess) => {
  console.log(user);
  http
    .post("/profile/forgot", user)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        handleSuccess("A mail has been sent to your registerd e-mail ");
        setInterval(() => {
          window.location.assign("/login");
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      setError("*****Email is not registered");
    });
};

// http.defaults.headers["x-token"]

const reset = (user, password, setError, handleSuccess) => {
  http
    .patch("/profile/change/reset", { uid: user.uid, password })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        handleSuccess("Password updated successfully  !!!!!");
        setInterval(() => {
          window.location.assign("/login");
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
      setError("Something went wrong!! please try again ");
    });
};

const verification = (user, setError, handleSuccess) => {
  http
    .patch("/profile/change/verify", { email: user.email })
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        handleSuccess("Account is successfully verified !!!!!");
        setInterval(() => {
          window.location.assign("/login");
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error);
      setError("Something went wrong!! please try again ");
    });
};
export default Forget;

export { reset, verification };
