import { deleteUser } from "../../Service/AdminService";
import EditForm from "./EditUser";
import React, { useEffect, useState } from "react";
import Snackbar from "../Common/CustomizedSnackbars";

import { activate } from "../../Service/AdminService";
const UserDetails = ({ user, setDetail, reload }) => {
  const [open, setOpen] = useState(false);
  const [isActive, setisActive] = useState(true);
  const [active, setActive] = useState(false);
  const { fname, lname, email, dob, uid, status } = user;

  return (
    <>
      <tr>
        <td>{fname}</td>
        <td>{lname}</td>
        <td>{email}</td>
        <td>{dob}</td>
        <td>{status !== 2 && status !== 0 ? "Yes" : "No"}</td>
        <td>
          {fname && (
            <EditForm user={user} setUser={setDetail} reload={reload} />
          )}
        </td>
        <td>
          {fname && (
            <Snackbar
              message={"User is Deleted Successfully"}
              uid={uid}
              name="Delete"
              open={open}
              setOpen={setOpen}
              onClick={() => {
                deleteUser(uid, setOpen);
              }}
              severity="success"
            />
          )}
        </td>
        <td>
          {status === 2 && isActive && (
            <Snackbar
              message={"User is Activated Successfully"}
              uid={uid}
              name="Activate"
              open={active}
              setOpen={setActive}
              onClick={() => {
                console.log(uid);
                activate(uid, setActive, reload, setisActive);
              }}
              severity="success"
            />
          )}
        </td>
      </tr>
    </>
  );
};

export default UserDetails;
