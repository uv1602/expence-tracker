import React, { useState, useEffect } from "react";
import Header from "../Common/Header";
import { Icon } from "@iconify/react";
import styles from "./Admin.module.scss";
import UserDetails from "./UserDetails";
import EditUserDetails from "./EditUserDetails";
import userEvent from "@testing-library/user-event";
// import EditUserDetails from './EditUserDetails';
import {
  getNonVerfiedUser,
  getAllUser,
  getVerfiedUser,
  getUser,
  getAdminUser,
  getSuspendUser,
} from "../../Service/AdminService";
import EditForm from "./EditUser";
import { Button, listItemAvatarClasses } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
const Admin = () => {
  const [list, setList] = useState([]);
  const [listofUser, setListofUser] = useState([]);
  const [listofVerifiedUser, setListofVerifiedUser] = useState([]);
  const [listofNonVerifiedUser, setListofNonVerifiedUser] = useState([]);
  const [listofAdminUser, setListofAdminUser] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [listSuspendUser, setListSuspendUser] = useState([]);

  const [error, setError] = useState("");
  useEffect(() => {
    reload();
    getAllUser(setList, setError);
  }, []);

  const reload = () => {
    getNonVerfiedUser(setListofNonVerifiedUser, setError);
    getAllUser(setListofUser, setError);
    getAdminUser(setListofAdminUser, setError);
    getVerfiedUser(setListofVerifiedUser, setError);
    getUser(setListUser, setError);
    getSuspendUser(setListSuspendUser, setError);
  };

  return (
    <main>
      <Header
        message="List of users"
        ficon={<Icon icon="fluent:text-bullet-list-square-shield-20-regular" />}
      />

      <div className={styles.box}>
        <ToggleButtonGroup
          exclusive
          alignment="pie"
          aria-label="Platform"
          sx={{
            background: "#01579B",
            margin: "2%",
          }}
        >
          <ToggleButton
            onClick={() => {
              setList([...listofUser]);
            }}
            value="0"
          >
            All
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              setList([...listofVerifiedUser]);
            }}
            value="1"
          >
            Verified
          </ToggleButton>

          <ToggleButton
            onClick={() => {
              setList([...listofNonVerifiedUser]);
            }}
            value="2"
          >
            Non-Verified
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              setList([...listofAdminUser]);
            }}
            value="3"
          >
            Admin
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              setList([...listUser]);
            }}
            value="4"
          >
            User
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              setList([...listSuspendUser]);
            }}
            value="4"
          >
            De-active User
          </ToggleButton>
        </ToggleButtonGroup>
        <div style={{ color: "white" }}>{error}</div>
        {console.log(listofVerifiedUser)}
        <table
          className="table table-stripped table border"
          style={{
            color: "white",
          }}
        >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Id</th>
              <th>Date of Birth</th>
              <th>Active Status</th>
              <th colSpan={3}>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  No record found
                </td>
              </tr>
            )}
            {list.length !== 0 &&
              list.map((user, key) => {
                return <UserDetails user={user} reload={reload} show={true} />;
              })}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Admin;
