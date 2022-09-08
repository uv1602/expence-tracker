import styles from "./Analytics.module.scss";
import Line from "./Charts/Line";
import { WiStars } from "react-icons/wi";
import Pie from "../Dashboard/Charts/Pie";
import Columns from "../Dashboard/Charts/Columns";

const Statistics = ({ sum, percentage, title }) => {
  return (
    <div className={styles.statistic}>
      <div className={styles.overview}>
        <span className={styles.sum}>{sum}</span>
        <span
          className={`${styles.percentage} ${
            percentage > 7 ? styles.percetange_green : styles.percentage_orange
          }`}
        >{`${percentage > 0 ? "+" : ""}${percentage}%`}</span>
      </div>
      <h3 className={styles.statistic_title}>{title}</h3>
    </div>
  );
};

const Analytics = () => {
  return (
    <main>
      <div className={styles.title}>
        <WiStars />
        <h1>Average Monthy Expences</h1>
      </div>

      <div className={styles.title}>
        <h2>Bar Chart</h2>
      </div>
      <div className={styles.columns}>
        <Columns />
      </div>
      <div className={styles.title}>
        <h2>Pie Chart</h2>
      </div>
      <div className={styles.pie}>
        <Pie />
      </div>

      <div className={styles.title}>
        <h2>Analytics</h2>
      </div>
      <div className={styles.container}>
        {/* ANALYTICS */}
        <div className={styles.analytics}>
          <div className={styles.statistics}>
            <Statistics sum="42.3K" percentage={41} title="Unique Visitors" />
            <Statistics sum="25.6K" percentage={-2} title="Total Pageviews" />
            <Statistics sum="40%" percentage={10} title="Bounce Rate" />
            <Statistics sum="2.3m" percentage={-6} title="Visit Duration" />
          </div>
          <div className={styles.line}>
            <Line />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Analytics;
