//REACT ROUTER
import { Link } from "react-router-dom";

//HOOKS
import useClickOutside from "../../../CustomHooks/ClickOutside";
import { useState } from "react";

//ICONS

//ICONS , PICS , STYLES
import styles from "./MyProfile.module.scss";
import { ReactComponent as Avatar } from "../../../pics/avatar.svg";
import { Icon } from "@iconify/react";

const MyProfile = ({ name, role }) => {
  const [isProfileOpen, setisProfileOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setisProfileOpen(false);
  });
  return (
    <div
      ref={domNode}
      className={styles.avatar_container}
      onClick={() => {
        setisProfileOpen(!isProfileOpen);
      }}
    >
      {/* AVATAR ICON */}
      <div className={styles.icon_avatar_container}>
        <Avatar />
      </div>

      {/* NAME */}
      <div className={styles.name}>
        <span>{name}</span>
        <Icon icon="ri:arrow-drop-down-line" />
      </div>

      {/* AVATAR/SETTINGS SUBMENU */}
      <div
        className={`${styles.menu} ${isProfileOpen ? styles.menu_active : ""}`}
      >
        <div className={styles.info}>
          <span className={styles.name}>
            <Icon icon="healthicons:ui-user-profile-outline" />
            {name}
          </span>
          <span className={styles.role}>{role}</span>
        </div>
        <div className={styles.settings}>
          <Link to="/">
            <Icon icon="icon-park-solid:setting" />
            Settings
          </Link>
          <Link to="/">
            <Icon icon="mdi:logout" /> Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
