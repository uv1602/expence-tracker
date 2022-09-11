//STYLES
import Button from "../Common/Button";
import Input from "../Common/Input";
import styles from "./Signup.module.scss";
import login from "../../Service/LoginService";

const Signup = () => {

  const handleSubmit = (event)=>{
    event.preventDefault();
    const {email,password} = event.target;
    console.log(email," ",password);
     login({
        email: email.value,
        password: password.value,
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} method="post" >
        <Input placeholder="Enter Your Email Name" label="Email" name="email" />
        <Input placeholder="Enter Your User Password" label="Password" name="password" />
        <Button body={"Log In"} colour={"0"} type="submit" />
        <Button body={"Register"} url={"/register"} />
        </form>
      </div>
    </div>
  );
};

export default Signup;
