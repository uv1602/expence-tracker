import styles from "./Income.module.scss";
import Record from "../../Common/Record";
import { todayExpence, yesterdayExpence } from "../../../Service/data";

const Income = () => {
  // const today = [
  //   { date: "2022-07-27", category: "Office", amount: "500" },
  //   { date: "2022-07-27", category: "Office", amount: "5000" },
  // ];

  const today = todayExpence();

  // const yesterday = [
  //   { date: "2022-07-27", category: "Office", amount: "500" },
  //   { date: "2022-07-27", category: "Office", amount: "5000" },
  // ];

  const yesterday = yesterdayExpence();

  return (
    // <div className={styles.container}>

    <div>
      <div className={styles.title}>
        <h2>Recent Income/Expense</h2>
      </div>
      <div className={styles.today}>
        <h3 className={styles.activity_day}>Today</h3>
        <div className={styles.activities}>
          {/* <Record /> */}
          {today.length == 0 ? (
            <Record />
          ) : (
            today.map((t, key) => {
              console.log(key);
              return (
                <div className={key}>
                  <Record income={t.amount} content={t.category} />
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className={styles.yesterday}>
        <h3 className={styles.activity_day}>Yesterday</h3>
        <div className={styles.activities}>
          {yesterday.length == 0 ? (
            <Record />
          ) : (
            yesterday.map((t, key) => {
              console.log(key);
              return (
                <div className={key}>
                  <Record income={t.amount} content={t.category} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Income;
