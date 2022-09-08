import { Icon } from "@iconify/react";
import Header from "../Common/Header";
import Label from "./Label";
import { profile } from "../../Service/Profile";
import Button from "../Common/Button";

//STYLES
import styles from "./MyProfile.module.scss";

// TODO : Generate whole page
const MyProfile = () => {
  return (
    <main>
      <Header
        message="My Profile"
        ficon={<Icon icon="iconoir:profile-circled" />}
      />
      <div className={styles.box}>
        <div className="row ">
          <div className="col-4">
            <Button
              colour={0}
              url={"/dashBoard"}
              body="Back to Dashboard"
              ficon={
                <Icon icon="emojione-monotone:backhand-index-pointing-left" />
              }
            />
          </div>
          <div className="col-md-4 offset-md-4">
            <Button
              colour={1}
              url={"/edit"}
              body="Edit Profile"
              ficon={<Icon icon="akar-icons:plus" />}
            />
          </div>
        </div>
      </div>

      <div className={styles.box}>
        <table class="table table-hover">
          <tbody>
            <tr>
              <td>
                <Label title="First Name" value={profile.fname} />
              </td>
              <td>
                <Label title="Last Name" value={profile.lname} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <Label title="Gender" value={profile.gender} />{" "}
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
                <Label title="Email" value={profile.email} />
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <Label title="Mobile Name" value={profile.mob} />
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
                <Label
                  title="Highest Qualification"
                  value={profile.hqualification}
                />
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
                <Label title="Address" value={profile.address} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default MyProfile;
