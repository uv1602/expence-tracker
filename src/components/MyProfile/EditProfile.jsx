import style from "../Common/Dashboard.module.scss";
import styles from "../Team/Team.module.scss";
import { profile } from "../../Service/Profile";
import People1 from "../../pics/people1.jpg";
import Label from "./Label";

const Card = ({ person_image }) => {
  return (
    <div>
      <div className={styles.info}>
        <div className={styles.photo_container}>
          <img src={person_image} alt="person" />
        </div>
        <span className={styles.name}>
          {profile.fname + " " + profile.lname}
        </span>
      </div>
      <table className="table table-hover table-striped ">
        <form></form>
        <tbody>
          <Label title={"First Name"} value={profile.fname} fname="fname" />
          <Label title={"Last Name"} value={profile.lname} fname="lname" />
          <Label title={"Gender"} value={profile.gender} fname="gender" />
        </tbody>
      </table>
    </div>
  );
};

const Profile = () => {
  return (
    <main>
      <div className={style.box}>
        <Card person_image={People1} />
      </div>
    </main>
  );
};

export default Profile;
