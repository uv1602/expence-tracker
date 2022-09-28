import * as http from "./httpService";

const ProfileServices = (editedUser, setToken) => {
  http
    .patch("/profile", editedUser)
    .then((data) => {
      if (data.status === 200) {
        localStorage.setItem("token", data.data.token);
        window.location.reload();
      }
      console.log(data.data.token);
      setToken(data.data.token);
      return data;
    })
    .catch((error) => {});
};

const ChangePassword = (updatedPassword, setError, handleSuccess, setOpen) => {
  console.log({ updatedPassword });
  http
    .patch("/profile/change/password", updatedPassword)
    .then((data) => {
      console.log(data.status);
      if (data.status === 200) {
        handleSuccess(data.data.message);
        setInterval(() => {
          setOpen(false);
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      setError(error.response.data.message);
    });
};

const deactivateUser = (payload, setError, handleSuccess, setOpen) => {
  console.log({ payload });
  http
    .patch("/profile/deactivate", payload)
    .then((data) => {
      console.log(data.status);
      if (data.status === 200) {
        handleSuccess(data.data.message);
        setInterval(() => {
          setOpen(false);
          setInterval(() => {
            localStorage.removeItem("token");
            window.location.assign("/login");
          }, 2000);
        }, 2000);
      }
    })
    .catch((error) => {
      console.log(error.response.data);
      setError(error.response.data.message);
    });
};

const deleteUser = (uid, setSuccess) => {
  let url = "/admin/delete/" + uid;
  console.log(url);
  http
    .remove(url)
    .then((response) => {
      if (response.status === 200) {
        setSuccess(response.data.message);
        localStorage.removeItem("token");
        window.location.assign("/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export default ProfileServices;
export { ChangePassword, deactivateUser, deleteUser };
