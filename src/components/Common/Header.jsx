import styles from "./Dashboard.module.scss";

const Header = ({ message, name, icon, ficon }) => {
  return (
    <div className={styles.welcome}>
      <h1>
        {ficon} {message} {name} {icon}
      </h1>
    </div>
  );
};

export default Header;
