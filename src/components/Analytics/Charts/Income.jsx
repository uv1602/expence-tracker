import styles from "./Income.module.scss";
import Record from "../../Common/Record";

const Income = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h2>Recent Income/Expense</h2>
      </div>
      <div className={styles.today}>
        <h3 className={styles.activity_day}>Today</h3>
        <div className={styles.activities}>
          <Record />
        </div>
      </div>
      <div className={styles.yesterday}>
        <h3 className={styles.activity_day}>Yesterday</h3>
        <div className={styles.activities}>
          <Record />
        </div>
      </div>
    </div>
  );
};

export default Income;
