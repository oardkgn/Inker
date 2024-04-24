import { useState, useContext } from "react";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import {ReqLogin, ReqAdmin} from "./components/Restricted";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<ReqLogin />}>
          <Route path="/profile" element={<Profile />} />
          <Route element={<ReqAdmin />}>
          <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
