import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import styles from "../Dashboard/Charts/Income.module.scss";

const Act = ({ content, income }) => {
  const ArrowRight = () => {
    return (
      <div className={styles.icon} style={{ background: `rgb(42, 170, 85)` }}>
        <FaArrowRight />
      </div>
    );
  };

  const ArrowLeft = () => {
    return (
      <div className={styles.icon} style={{ background: `rgb(232,79,79)` }}>
        <FaArrowLeft />
      </div>
    );
  };

  return (
    <div className={styles.activity}>
      {income >= 0 ? <ArrowRight /> : <ArrowLeft />}
      <div className={styles.content}>
        <span>{content}</span>
        <span
          className={`${styles.income} ${
            income >= 0 ? styles.income_green : undefined
          }`}
        >{`$${income}`}</span>
      </div>
    </div>
  );
};

Act.defaultProps = {
  content: "No Record Found",
  income: "0.00",
};

export default Act;
