//STYLES
import styles from "./RightNavbar.module.scss";

// HOOKS
import { useContext } from "react";

//CONTEXT
import NavContext from "../../Context/NavContext";
import { MdOutlineMenu } from "react-icons/md";
//Components
import MyProfile from "./Submenus/MyProfile";
import Support from "./Submenus/Support";
import Notifications from "./Submenus/Notifications";

const RightNavbar = ({ name, role }) => {
  const { nav, setNav } = useContext(NavContext);

  return (
    <div className={styles.container}>
      <div
        className={styles.burger_container}
        onClick={() => {
          setNav(!nav);
        }}
      >
        <MdOutlineMenu />
      </div>
      <div className={styles.logo}>
        <h1>Expense Tracker System</h1>
      </div>
      {/* ACTIONS */}
      {/* <div className={styles.actions}>
        <Notifications />
        <Support />
      </div> */}

      {/* My Profile */}
      <MyProfile name={name} role={role} />
    </div>
  );
};

export default RightNavbar;
