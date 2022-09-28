import style from "../Common/Dashboard.module.scss";
import styles from "../Team/Team.module.scss";
import People1 from "../../pics/people1.jpg";
import Label from "./Label";
import EditUser from "./EditUser";
import { Avatar, Grid } from "@mui/material";

import DeactvativeUser from "./Setting/DeactivateUser";
import DeleteUser from "./Setting/DeleteUser";
import ChangePassWord from "./Setting/ChangePassWord";

const Card = ({ person_image, user, setUser }) => {
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
      <Grid container spacing={4} sx={{ marginTop: "1%", marginLeft: "1%" }}>
        <Grid item sm={3} xs={6}>
          <EditUser user={user} />
        </Grid>
        <Grid item sm={3} xs={6}>
          <ChangePassWord />
        </Grid>
        <Grid item sm={3} xs={6}>
          <DeactvativeUser email={user.email} />
        </Grid>
        <Grid item sm={3} xs={6}>
          <DeleteUser uid={user.uid} />
        </Grid>
      </Grid>
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
