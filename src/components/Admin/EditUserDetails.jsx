import styles from "../Team/Team.module.scss";
import FormElement from "./../MyProfile/FormElement";
import Button from "../Common/Button";
import People1 from "../../pics/people1.jpg";


const Card = ({ person_image, user, setUserDeatils }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname, gender, dob, email } = e.target;
    console.log({
      fname: fname.value ? fname.value : user.fname,
      lname: lname.value ? lname.value : user.lname,
      gender: gender.value ? gender.value : user.gender,
      dob: dob.value ? dob.value : user.dob,
      email: email.value ? email.value : user.email,
    });
    setTimeout(() => {
      setUserDeatils({});
    }, 1000);
  };
  return (
    <div>
      {console.log(user, setUserDeatils, "hi")}
      <div className={styles.info}>
        <div className={styles.photo_container}>
          <img src={person_image} alt="person" />
        </div>
        <span className={styles.name}>{user.fname + " " + user.lname}</span>
      </div>
      <form onSubmit={handleSubmit}>
        <table className="table table-hover table-striped ">
          <tbody>
            <FormElement
              title={"First name"}
              placeholder={user.fname}
              name={"fname"}
            />
            <FormElement
              title={"Last Name"}
              placeholder={user.lname}
              name={"lname"}
            />
            <FormElement
              title={"Gender"}
              placeholder={user.gender}
              name={"gender"}
            />
            <FormElement
              title={"Date of Birth"}
              placeholder={user.dob}
              name={"dob"}
            />
            <FormElement
              title={"Mail"}
              placeholder={user.email}
              name={"email"}
            />
            <FormElement
              title={"Role"}
              placeholder={user.role === 0 ? "User" : "Admin"}
              name={"role"}
            />
            <FormElement
              title={"Verfied"}
              placeholder={user.status === 0 ? "Not Verified" : "Verified"}
              name={"status"}
            />
          </tbody>
        </table>
        <Button
          colour={1}
          body="Back"
          handleClick={() => {
            setUserDeatils({});
          }}
        />
        <Button colour={0} body="Submit" type={"submit"} />
      </form>
    </div>
  );
};

const EditUserDetails = ({ user, setUserDeatils }) => {
  return (
    <div>
      <Card
        person_image={People1}
        user={user}
        setUserDeatils={setUserDeatils}
      />
    </div>
  );
};

export default EditUserDetails;
