//STYLES
import register from "../../Service/RegisterService";
import Button from "../Common/Button";
import Input from "../Common/Input";
import Radio from "../Common/Radio";
import styles from "./Signin.module.scss";

const Signup = () => {

   const handleSubmit = (event)=>{
    event.preventDefault();
    const {fname, lname, email,password,dob,cpassword} = event.target;
    console.log(email," ",password);
    if(cpassword.value == password.value){
      register({
        email: email.value,
        password: password.value,
        fname: fname.value,
        lname: lname.value,
        dob: dob.value
      });
    }
  }


  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} method="post">
          <Input placeholder="Enter Your First Name" label="First Name" name="fname"/>
          <Input placeholder="Enter Your Last Name" label="Last Name" name="lname" />
          <Input placeholder="Enter Your Email" label="Email" name="email" type="email"/>
          <Input
            placeholder="Enter Your Password"
            label="Password"
            name="password"
          />
          <Input
            placeholder="Enter Your Confirm Password"
            label="Confirm Password"
            name="cpassword"
          />
          <Input
            placeholder="Enter Your Date of birth"
            label="Date of Birth"
            type="date"
            name="dob"
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
          <Button body={"Register"} colour={"0"} type="submit" />
          <Button body={"Log In"} url={"/login"} />
        </form>
      </div>
    </div>
  );
};

export default Signup;
