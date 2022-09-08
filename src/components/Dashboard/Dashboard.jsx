import styles from "../Common/Dashboard.module.scss";
import Income from "./Charts/Income";
import Header from "../Common/Header";
import { Icon } from "@iconify/react";

import { GoPlus } from "react-icons/go";

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
        <a href="/add">
          <button className="btn btn-primary">
            Add Expences
            <GoPlus />
          </button>
        </a>
      </div>
    </main>
  );
};

export default Dashboard;
