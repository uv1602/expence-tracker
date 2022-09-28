const Logout = () => {
  const Logout = () => {
    localStorage.removeItem("token");
    window.location.assign("/login");
  };
  return <div>{Logout()}</div>;
};

export default Logout;
