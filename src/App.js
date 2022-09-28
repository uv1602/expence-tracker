import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import RightNavbar from "./components/RightNavbar/RightNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import Add from "./components/Add/Expence";
import Team from "./components/Team/Team";
import NavContext from "./Context/NavContext";
import ShowRecord from "./components/ShowRecord/ShowRecord";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Logout from "./components/Logout/Logout";
import { getCurrentAuthUser, isLoginStatus } from "./Service/AuthUserDetail";
import Profile from "./components/MyProfile/EditProfile";
import Admin from "./components/Admin/Admin";
import EditUserDetails from "./components/Admin/EditUserDetails";
import Setting from "./components/MyProfile/Setting";
import { ThemeProvider, createTheme } from "@mui/material";
import Forget from "./components/Auth/Forget";
import Reset from "./components/Auth/Reset";
import Verify from "./components/Auth/Verify";
const App = () => {
  const [nav, setNav] = useState(false);
  const value = { nav, setNav };
  const [user, setUser] = useState({});
  const [navbar, setNavBar] = useState("");
  const [stickyNavBar, setStickyNavBar] = useState("");
  const [isLogin, SetIsLogin] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  useEffect(() => {
    if (!isLogin) {
      getCurrentAuthUser(setUser);
      isLoginStatus(SetIsLogin);
    } else {
      setStickyNavBar(
        <RightNavbar
          name={user.fname}
          role={user.role !== 0 ? "Admin" : "User"}
        />
      );
      setNavBar(<Navbar user={user} />);
    }
  }, [isLogin]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <NavContext.Provider value={value}>
          {navbar}
          <Container
            isLogin={isLogin}
            stickyNav={stickyNavBar}
            content={
              <Routes>
                {!isLogin && (
                  <Route element={<Outlet />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<Forget />} />
                    <Route path="/reset/:token" element={<Reset />} />
                    <Route path="/verify/:token" element={<Verify />} />
                    <Route
                      path="*"
                      element={<Navigate to="/login" replace />}
                    />
                  </Route>
                )}

                {isLogin && (
                  <Route element={<Outlet />}>
                    <Route path="/" element={<Dashboard name={user.fname} />} />
                    <Route
                      path="/dashboard"
                      element={<Dashboard name={user.fname} />}
                    />
                    <Route path="/profile" element={<Profile user={user} />} />
                    <Route path="/add" element={<Add />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/show" element={<ShowRecord />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/setting" element={<Setting user={user} />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/edit" element={<EditUserDetails />} />
                    <Route path="/*" element={<Navigate to="/" replace />} />
                  </Route>
                )}
              </Routes>
            }
          />
        </NavContext.Provider>
      </div>
    </ThemeProvider>
  );
};

export default App;
