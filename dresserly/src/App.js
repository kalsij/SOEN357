import "./App.css";

import SignIn from "./Authentication/SignIn";
import SignUp from "./Authentication/SignUp";
import Home from "./Home";
import NavbarFun from "./Nav.js";
import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./UserAuthContext";
import MatchingPage from "./Matching/MatchingPage";

function App() {
  return (
    <UserAuthContextProvider>
      <NavbarFun />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Match" element={<MatchingPage />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;
