import styles from "./Container.module.scss";

const Container = ({ stickyNav, content }) => {
  return (
    <div className={styles.container}>
      {window.location.pathname != "/signup" &&
        window.location.pathname != "/signin" &&
        stickyNav}
      {content}
    </div>
  );
};

export default Container;
