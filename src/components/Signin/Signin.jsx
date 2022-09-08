//STYLES
import Button from "../Common/Button";
import Input from "../Common/Input";
import styles from "./Signin.module.scss";

const Signup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Signup</h1>
        <Input placeholder="Enter Your User Name" label="User Name" />
        <Input placeholder="Enter Your User Password" label="Password" />
        <Button body={"Sign in"} colour={"0"} />
        <Button body={"Sign Up"} url={"/signup"} />
      </div>
    </div>
  );
};

export default Signup;
