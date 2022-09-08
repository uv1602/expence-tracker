import styles from "./Container.module.scss";

const Container = ({ stickyNav, content }) => {
  return (
    <div className={styles.container}>
      {window.location.pathname != "/signup" && { stickyNav }}
      {content}
    </div>
  );
};

export default Container;
