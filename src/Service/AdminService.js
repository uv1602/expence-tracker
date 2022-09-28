import * as http from "./httpService";

const getNonVerfiedUser = (setYesterday, setError) => {
  http
    .get("/admin/show/notverified")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log("!!!!! Internal Server Crash ");
      setError("!!!!! Internal Server Crash ");
    });
};

const getAllUser = (setYesterday, setError) => {
  http
    .get("/admin/show/all")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log("!!!!! Internal Server Crash ");
      setError("!!!!! Internal Server Crash ");
    });
};

const getVerfiedUser = (setYesterday, setError) => {
  http
    .get("/admin/show/verified")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log("!!!!! Internal Server Crash ");
      setError("!!!!! Internal Server Crash ");
    });
};

const getSuspendUser = (setYesterday, setError) => {
  http
    .get("/admin/show/suspend")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log("!!!!! Internal Server Crash ");
      setError("!!!!! Internal Server Crash ");
    });
};

const getAdminUser = (setYesterday, setError) => {
  http
    .get("/admin/show/admin")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log("!!!!! Internal Server Crash ");
      setError("!!!!! Internal Server Crash ");
    });
};

const getUser = (setYesterday, setError) => {
  http
    .get("/admin/show/user")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log("!!!!! Internal Server Crash ");
      setError("!!!!! Internal Server Crash ");
    });
};

const deleteUser = (uid, setOpen) => {
  let url = "/admin/delete/" + uid;
  console.log(url);
  http
    .remove(url)
    .then((response) => {
      console.log(response.data);
      setOpen(true);
    })
    .catch((error) => {
      console.log(error);
    });
};

const activate = (uid, setOpen, reload, setisActive) => {
  http
    .patch("/admin/activate", { uid })
    .then((response) => {
      if (response.data["status"] === "success") {
        setOpen(true);
        setisActive(false);
        reload();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const profileServices = (editedUser, handleClose, reload) => {
  http
    .patch("/admin/edit/user", editedUser)
    .then((res) => {
      handleClose();
      reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  activate,
  deleteUser,
  profileServices,
  getNonVerfiedUser,
  getAllUser,
  getVerfiedUser,
  getUser,
  getAdminUser,
  getSuspendUser,
};
