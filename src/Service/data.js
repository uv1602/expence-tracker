const data = [10];

const cat = ["Bill", "Food", "Transport", "Other"];

const Expence = [];

const expence = (date) => {
  const today = [];
  Expence.map((expence) => {
    let d = new Date(expence.date);
    d = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate();

    let d1 = new Date(date);

    d1 = d1.getFullYear() + "-" + d1.getMonth() + "-" + d1.getDate();
    console.log(d1);
    if (d === d1) {
      today.push(expence);
    }
  });
  return today;
};

const yesterdayExpence = () => {
  let d = new Date();
  d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() - 1);
  console.log(d);
  return expence(d.toString());
};

const todayExpence = () => {
  let d = new Date();
  d = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  console.log(d);
  // todayexpense();
  return expence(d.toString());
};

const addExpence = (expence) => {
  Expence.push(expence);
  console.log(Expence);
};

const record = () => {
  return Expence;
};

export {
  data,
  cat,
  addExpence,
  yesterdayExpence,
  todayExpence,
  record,
  Expence,
};
