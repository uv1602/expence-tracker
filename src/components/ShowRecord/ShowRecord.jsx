import Header from "../Common/Header";
import Record from "../Common/Record";
import { Icon } from "@iconify/react";
import Button from "../Common/Button";
import styles from "../Common/Dashboard.module.scss";
import { show } from "../../Service/ExpenseService";
import { useEffect, useState } from "react";
import DataGrid from "./DataGrid";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Grid, Typography } from "@mui/material";
const ShowRecord = () => {
  const [allExpense, setAllExpense] = useState([]);
  const [toggle, settoggle] = useState(true);
  useEffect(() => {
    show(setAllExpense);
  }, []);

  return (
    <main>
      <Header
        message="Display Transaction Record"
        ficon={<Icon icon="fontisto:eye" />}
      />
      {/* <Grid
        container
        spacing={3}
        sx={{
          margin: "2%",
        }}
      >
        <Grid xs={6} md={4} sm={6}>
          <Button
            colour={"success"}
            url={"/dashBoard"}
            body="Back to Dashboard"
            ficon={
              <Icon icon="emojione-monotone:backhand-index-pointing-left" />
            }
          />
        </Grid>
        <Grid xs={2} md={5} sm={2}></Grid>
        <Grid
          xs={4}
          md={2}
          sm={4}
          sx={{
            alignContent: "end",
            justifyContent: "end",
          }}
        >
          <Button colour={"info"} url={"/add"} body="Add new Expense" />
        </Grid>
      </Grid> */}
      <div className={styles.box}>
        <ToggleButtonGroup
          sx={{
            background: "#01579B",
            margin: "2%",
          }}
          exclusive
          alignment="sorting"
          aria-label="Platform"
        >
          <ToggleButton
            onClick={() => {
              settoggle(false);
            }}
            value="sorting"
          >
            Sorting
          </ToggleButton>
          <ToggleButton
            onClick={() => {
              settoggle(true);
            }}
            value="action"
          >
            Action
          </ToggleButton>
        </ToggleButtonGroup>
        {!toggle && (
          <div style={{ width: "50%" }}>
            <DataGrid
              rows={[...allExpense]}
              columns={[
                {
                  field: "cat_name",
                  headerName: "Categories",
                  width: 350,
                },
                {
                  field: "date",
                  headerName: "Date",
                  width: 300,
                  type: "date",
                },
                {
                  field: "amount",
                  headerName: "Amount",
                  type: "number",
                  width: 300,
                },
              ]}
            />
          </div>
        )}
        {toggle && (
          <div>
            {allExpense.length === 0 ? (
              <Record />
            ) : (
              allExpense.map((t, key) => {
                return (
                  <div className="m-3" name={key}>
                    {console.log(t)}

                    <Record
                      income={t.amount}
                      content={t.cat_name}
                      eid={t.id}
                      date={t.date}
                      show={false}
                    />
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default ShowRecord;
