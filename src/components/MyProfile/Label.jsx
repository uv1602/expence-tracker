//STYLES
import styles from "./MyProfile.module.scss";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { useState } from "react";
import { profile } from "../../Service/Profile";

const Label = ({ title, value, fname, placeholder, type }) => {
  const [isEdit, setIsEdit] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const profile = e.target;
    console.log(profile.value);
  };
  return (
    <div className="row">
      <div className="col-12">
        {isEdit ? (
          <div>
            {title}
            {value}{" "}
            <Button
              body="Edit"
              handleClick={() => setIsEdit((prev) => !prev)}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div class="  d-flex flex-nowrap">
              <div class="col-3 order-1 p-1">{title}</div>
              <div class="col-6 order-2 p-1">
                {" "}
                <Input name={fname} type={type} placeholder={placeholder} />
              </div>
              <div class="col-3 order-3 ">
                <Button body="Save" colour={0} />
                <Button
                  body="Back"
                  handleClick={() => setIsEdit((prev) => !prev)}
                />{" "}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Label;
