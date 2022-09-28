import styles from "./Analytics.module.scss";
import { WiStars } from "react-icons/wi";
import Header from "../Common/Header";
import React, { useEffect, useState } from "react";
import BarChart from "./Charts/BarChart";
import PieChart from "./Charts/PieChart";
import { categories } from "../../Service/ExpenseService";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [toggle, settoggle] = useState(true);
  useEffect(() => {
    categories(setData);
  }, []);

  return (
    <main>
      <Header message="Expense Details" ficon={<WiStars />} />
      <div className={styles.box}>
        {data.length === 0 && (
          <Typography component="p" variant="p" color={"error"}>
            ** No record found
          </Typography>
        )}
        <ToggleButtonGroup
          exclusive
          alignment="pie"
          aria-label="Platform"
          sx={{
            background: "#01579B",
            margin: "2%",
          }}
        >
          <ToggleButton
            onClick={() => {
              settoggle(false);
            }}
            value="pie"
          >
            Pie
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              settoggle(true);
            }}
            value="bar"
          >
            Bar
          </ToggleButton>
        </ToggleButtonGroup>
        <div className={styles.pie}>
          {toggle && <BarChart bar={data} />}
          {!toggle && <PieChart pie={data} />}
        </div>
      </div>
    </main>
  );
};

export default Analytics;
