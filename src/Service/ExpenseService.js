import * as http from "./httpService";

const expense = (expense) => {
  http
    .post("/add", expense)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const show = (setYesterday) => {
  http
    .get("/show")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const todayExpense = (setToday) => {
  http
    .get("/show/today")
    .then((response) => {
      if (response.data["status"] === "success") {
        setToday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const yesterdayExpense = (setYesterday) => {
  http
    .get("/show/yesterday")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const categories = (setYesterday) => {
  http
    .get("/show/categories")
    .then((response) => {
      if (response.data["status"] === "success") {
        setYesterday(response.data["result"]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteExpense = (eid) => {
  let url = "/delete/" + eid;
  console.log(url);
  http
    .remove(url)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  expense,
  show,
  todayExpense,
  yesterdayExpense,
  categories,
  deleteExpense,
};
