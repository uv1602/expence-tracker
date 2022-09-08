//STYLES
import styles from "./RightNavbar.module.scss";

//HOOKS
import { useContext } from "react";

//CONTEXT
import NavContext from "../../Context/NavContext";

//Components
import MyProfile from "./Submenus/MyProfile";
import Support from "./Submenus/Support";
import Notifications from "./Submenus/Notifications";

const RightNavbar = ({ name, role }) => {
  const { nav, setNav } = useContext(NavContext);

  return (
    <div className={styles.container}>
      {/* ACTIONS */}
      <div className={styles.actions}>
        <Notifications />
        <Support />
      </div>

      {/* My Profile */}
      <MyProfile name={name} role={role} />
    </div>
  );
};

export default RightNavbar;
