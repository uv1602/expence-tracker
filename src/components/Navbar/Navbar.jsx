//STYLES
import styles from "./Navbar.module.scss";

//CONTEXT
import { useContext, useEffect } from "react";
import NavContext from "../../Context/NavContext";

//REACT ROUTER
import NavUrl from "./NavUrl";

//ICONS
import { Icon } from "@iconify/react";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import {
  MdOutlineDashboard,
  MdOutlineAnalytics,
  MdPeopleOutline,
  MdOutlineMessage,
  MdOutlineLogout,
} from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { VscDashboard } from "react-icons/vsc";
import { isLoginStatus } from "../../Service/AuthUserDetail";

const Navbar = ({ user }) => {
  const { nav, setNav } = useContext(NavContext);

  useEffect(() => {
    if (Location.pathname !== "/login" && Location.pathname !== "/register") {
      setNav(true);
    }
  }, [Location.pathname]);

  return (
    <div
      className={`${styles.navbar_container} ${
        nav ? styles.navbar_mobile_active : undefined
      }`}
    >
      <nav className={nav ? undefined : styles.nav_small}>
        {/* LOGO */}
        <div className={styles.logo}>
          <VscDashboard className={styles.logo_icon} />
          <FaTimes
            className={styles.mobile_cancel_icon}
            onClick={() => {
              setNav(!nav);
            }}
          />
        </div>

        {/* MENU */}
        <ul className={styles.menu_container}>
          <span className={styles.categories}>
            {nav ? "Pages" : <BsThreeDots />}
          </span>

          <NavUrl
            url="/"
            icon={<MdOutlineDashboard />}
            description="Dashboard"
          />

          {user.role === 1 && (
            <NavUrl
              url="admin"
              icon={<Icon icon="eos-icons:admin-outlined" />}
              description="Admin"
            />
          )}
          <NavUrl
            url="profile"
            icon={<ManageAccountsIcon />}
            description="My Profile"
          />

          <NavUrl
            url="add"
            icon={<Icon icon="clarity:plus-circle-solid" />}
            description="Add Expences"
          />
          <NavUrl
            url="analytics"
            icon={<MdOutlineAnalytics />}
            description="Analytics"
          />

          <NavUrl
            url="show"
            icon={<Icon icon="fontisto:eye" />}
            description="Record"
          />
        </ul>

        {/* LOGOUT BUTTON */}
        <div
          className={`${styles.btn_logout}`}
          onClick={() => {
            setNav(!nav);
          }}
        >
          <MdOutlineLogout />
        </div>
      </nav>

      <div
        className={nav ? styles.mobile_nav_background_active : undefined}
        onClick={() => {
          setNav(!nav);
        }}
      ></div>
    </div>
  );
};

export default Navbar;
