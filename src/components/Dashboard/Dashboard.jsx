import styles from "../Common/Dashboard.module.scss";
import Income from "./Charts/Income";
import Header from "../Common/Header";
import { Icon } from "@iconify/react";
import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import Doughnut from "./Charts/Doughnut";
import { categories } from "../../Service/ExpenseService";
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
const Dashboard = ({ name }) => {
  return (
    <main>
      <Header
        message="Hello,"
        name={name}
        icon={<Icon icon="mdi:hand-wave" />}
      />

      <div className={styles.box}>
        <Income />
      </div>

      <div className="m-4">
        <Link to={"/add"}>
          <button className="btn btn-primary">
            Add Expences
            <GoPlus />
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Dashboard;
