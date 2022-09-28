import styles from "./Income.module.scss";
import Record from "../../Common/Record";
import {
  todayExpense,
  yesterdayExpense,
} from "../../../Service/ExpenseService";

import React, { useState, useEffect } from "react";

const Income = () => {
  const [today, setToday] = useState([]);
  const [yesterday, setYesterday] = useState([]);
  useEffect(() => {
    todayExpense(setToday);
    yesterdayExpense(setYesterday);
  }, []);

  return (
    <div>
      <div className={styles.title}>
        <h2>Recent Income/Expense</h2>
      </div>
      <div className={styles.today}>
        <h3 className={styles.activity_day}>Today</h3>
        <div className={styles.activities}>
          {today.length === 0 ? (
            <Record />
          ) : (
            today.map((t, key) => {
              return (
                <div className={key}>
                  <Record
                    income={t.amount}
                    content={t.cat_name}
                    eid={t.eid}
                    show={true}
                  />
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className={styles.yesterday}>
        <h3 className={styles.activity_day}>Yesterday</h3>
        <div className={styles.activities}>
          {yesterday.length === 0 ? (
            <Record />
          ) : (
            yesterday.map((t, key) => {
              return (
                <div className={key}>
                  <Record
                    income={t.amount}
                    content={t.cat_name}
                    eid={t.eid}
                    show={true}
                  />
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
