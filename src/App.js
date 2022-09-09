import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import RightNavbar from "./components/RightNavbar/RightNavbar";
import Dashboard from "./components/Dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import Add from "./components/Add/Expence";
import Team from "./components/Team/Team";
import MyProfile from "./components/MyProfile/MyProfile";
import NavContext from "./Context/NavContext";
import ShowRecord from "./components/ShowRecord/ShowRecord";
import EditProfile from "./components/MyProfile/EditProfile";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";

function App() {
  const [nav, setNav] = useState(false);
  const value = { nav, setNav };

  return (
    <div className="App">
      <NavContext.Provider value={value}>
        {window.location.pathname != "/signup" &&
          window.location.pathname != "/signin" && <Navbar />}
        <Container
          stickyNav={<RightNavbar name="Lucifer" role="Administor" />}
          content={
            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="*" element={<main>NOT FOUND</main>} />
              <Route path="/" element={<Dashboard name="Lucifer" />} />
              <Route path="/dashboard" element={<Dashboard name="Lucifer" />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/add" element={<Add />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/team" element={<Team />} />
              <Route path="/show" element={<ShowRecord />} />
              <Route path="/edit" element={<EditProfile />} />
            </Routes>
          }
        />
      </NavContext.Provider>
    </div>
  );
}

export default App;
