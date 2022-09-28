import style from "../Common/Dashboard.module.scss";
import styles from "../Team/Team.module.scss";
import People1 from "../../pics/people1.jpg";
import Label from "./Label";
import FormElement from "./FormElement";
import { useState, useEffect } from "react";
import Button from "../Common/Button";
import ProfileServices from "../../Service/ProfileServices";
import { updateToken } from "../../Service/AuthUserDetail";
import EditForm from "./EditUser";
import ChangePassWord from "../RightNavbar/Setting/ChangePassWord";
import { Avatar } from "@mui/material";
const Card = ({ person_image, user, setUser }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [token, setToken] = useState("");
  useEffect((e) => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, gender, dob, email } = e.target;
    ProfileServices(
      {
        fname: fname.value ? fname.value : user.fname,
        lname: lname.value ? lname.value : user.lname,
        gender: gender.value ? gender.value : user.gender,
        dob: dob.value ? dob.value : user.dob,
        email: email.value ? email.value : user.email,
      },
      setToken
    );
    updateToken(token);
    setIsEdit(() => setIsEdit(true));
  };
  return (
    <div>
      <div className={styles.info}>
        <div className={styles.photo_container}>
          <Avatar
            sx={{
              margin: "2%",
              height: "70px",
              width: "70px",
            }}
          />
        </div>
        <span className={styles.name}>{user.fname + " " + user.lname}</span>
      </div>

      <table
        style={{
          color: "rgb(240, 244, 248)",
          fontSize: "20px",
          width: "100%",
        }}
      >
        <tbody
          style={{
            marginLeft: "5%",
          }}
        >
          <Label title={"First Name"} value={user.fname} />
          <Label title={"Last Name"} value={user.lname} />
          <Label title={"Email Id"} value={user.email} />
          <Label title={"Date of Birth"} value={user.dob} />
          <Label title={"Gender"} value={user.gender} />
        </tbody>
      </table>

      <span className={styles.name}>
        <EditForm user={user} setUser={setUser} />
        {/* <ChangePassWord /> */}
      </span>
    </div>
  );
};

const Profile = ({ user, setUser }) => {
  return (
    <main>
      <div className={style.box}>
        <Card person_image={People1} user={user} setUser={setUser} />
      </div>
    </main>
  );
};

export default Profile;
