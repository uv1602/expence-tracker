import Input from "../Common/Input";
import { WiStars } from "react-icons/wi";
import { useState } from "react";
import Header from "../Common/Header";
import Message from "../Common/Message";
import { addExpence } from "../../Service/data";
import styles from "../Common/Dashboard.module.scss";
import { Icon } from "@iconify/react";
import Button from "../Common/Button";

const Add = () => {
  const [msg, setMsg] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, date, price } = e.target;
    setMsg(1);
    setInterval(() => setMsg(0), 3000);

    const Expences = {
      date: date.value,
      category: category.value,
      amount: price.value,
    };

    console.log(Expences);
    addExpence(Expences);
  };

  return (
    <main>
      <Header message="Add Expences" ficon={<WiStars />} />

      <div className={styles.box}>
        <Button
          colour={0}
          url={"/dashBoard"}
          body="Back to Dashboard"
          ficon={<Icon icon="emojione-monotone:backhand-index-pointing-left" />}
        />
        <Button colour={1} url={"/show"} body="Show Record" />
      </div>
      <div className={styles.box}>
        {msg != 0 && <Message />}
        <form onSubmit={handleSubmit}>
          <Input
            label="Date"
            type="date"
            placeholder="Enter date"
            name="date"
          />
          <Input
            label="Category"
            type="text"
            placeholder="Enter Category"
            name="category"
          />
          <Input
            label="Amount"
            type="number"
            placeholder="Enter total amount "
            name="price"
          />

          <div class="row justify-content-md-center">
            <div class="col-md-auto">
              <button className="btn btn-primary"> Submit </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Add;
