import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import styles from "../Dashboard/Charts/Income.module.scss";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteExpense } from "../../Service/ExpenseService";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import Snackbar from "./CustomizedSnackbars";
const Act = ({ content, income, eid, date, show }) => {
  const [open, setOpen] = useState(false);

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

  const [vis, setVis] = useState(true);

  return (
    <div>
      {vis && (
        <>
          <div className="row">
            <div className={styles.activity}>
              <div className={styles.content}>
                <div className="col-2">
                  {income >= 0 ? <ArrowRight /> : <ArrowLeft />}
                </div>
                <div className="col-5">
                  <span>{content}</span>
                </div>
                <div>{!show && <>{date}</>}</div>
                <span>{`$${income}`}</span>
                <span
                  className={`${styles.income} ${
                    income >= 0 ? styles.income_green : undefined
                  }`}
                >
                  {!show && (
                    <Snackbar
                      message={"Expense is Deleted Successfully"}
                      uid={eid}
                      name="Delete"
                      startIcon={<DeleteIcon />}
                      open={open}
                      setOpen={setOpen}
                      onClick={() => {
                        setOpen(true);
                        deleteExpense(eid);
                        console.log(eid);
                        setInterval(() => {
                          setVis(false);
                        }, 1500);
                      }}
                      severity="success"
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

Act.defaultProps = {
  content: "No Record Found",
  income: "0.00",
  show: true,
};

export default Act;
