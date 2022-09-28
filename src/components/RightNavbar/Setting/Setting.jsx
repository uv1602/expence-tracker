import EditForm from "../../MyProfile/EditUser";
import ChangePassWord from "./ChangePassWord";
import DeactvativeUser from "./DeactivateUser";
import DeleteUser from "./DeleteUser.jsx";
const Setting = ({ user }) => {
  return (
    <main>
      <div style={{ margin: "1em auto auto" }}>
        <EditForm user={user} />
      </div>
      <div style={{ margin: "1em auto auto" }}>
        <ChangePassWord />
      </div>
      <div style={{ margin: "1em auto auto" }}>
        <DeactvativeUser email={user.email} />
      </div>
      <div style={{ margin: "1em auto auto" }}>
        <DeleteUser uid={user.uid} />
      </div>
    </main>
  );
};

export default Setting;
