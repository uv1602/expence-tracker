const profile = {
  fname: "Lucifer",
  lname: "Vishwakarma",
  gender: "Male",
  email: "lucifer@gmail.com",
  mob: "+9188888888888",
  hqualification: "PG_DAC",
  address: "Temp Address",
};

const editProfile = ({ fname, lname, gender, email }) => {
  // profile.fname = fname;
  // window.alert(fname + " " + lname + " " + email + " " + gender);
  console.log(profile);
};
export { profile, editProfile };
