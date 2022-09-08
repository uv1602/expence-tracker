import Header from "../Common/Header";
import Record from "../Common/Record";
import { record } from "../../Service/data";
import { Icon } from "@iconify/react";
import Button from "../Common/Button";
import styles from "../Common/Dashboard.module.scss";

const ShowRecord = () => {
  const today = record();

  return (
    <main>
      <Header
        message="Display Tranx Record"
        ficon={<Icon icon="fontisto:eye" />}
      />
      <div className={styles.box}>
        <div className="row ">
          <div className="col-4">
            <Button
              colour={0}
              url={"/dashBoard"}
              body="Back to Dashboard"
              ficon={
                <Icon icon="emojione-monotone:backhand-index-pointing-left" />
              }
            />
          </div>
          <div className="col-md-4 offset-md-4">
            <Button
              colour={1}
              url={"/add"}
              body="Add New Expences"
              ficon={<Icon icon="akar-icons:plus" />}
            />
          </div>
        </div>
      </div>
      <div className={styles.box}>
        {today.length == 0 ? (
          <Record />
        ) : (
          today.map((t, key) => {
            console.log(key);
            return (
              <div className="m-3">
                <Record income={t.amount} content={t.category} />
              </div>
            );
          })
        )}
      </div>
    </main>
  );
};

export default ShowRecord;
