//STYLES
import Button from "../Common/Button";
import Input from "../Common/Input";
import Radio from "../Common/Radio";
import styles from "./Signin.module.scss";

const Signup = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Signin</h1>
        <form action="/dashboard" method="get">
          <Input placeholder="Enter Your User Name" label="User Name" />
          <Input placeholder="Enter Your Password" label="Password" />
          <Input
            placeholder="Enter Your Confirm Password"
            label="Confirm Password"
          />
          <Input
            placeholder="Enter Your Date of birth"
            label="Date of Birth"
            type="date"
          />
          <Input
            label={"Gender"}
            radio={[
              <Radio label={"Male"} name={"male"} id={"male"} value="M" />,
              <Radio
                label={"Female"}
                name={"female"}
                id={"female"}
                value="F"
              />,
              <Radio label={"Other"} name={"other"} id={"other"} value="O" />,
            ]}
          />
          <Button body={"Sign in"} colour={"0"} />
          <Button body={"Sign Up"} url={"/signup"} />
        </form>
      </div>
    </div>
  );
};

export default Signup;
