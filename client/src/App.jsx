import { useState, useContext } from "react";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { ReqLogin, ReqAdmin } from "./components/Restricted";
import Users from "./components/dashboard/Users";
import Products from "./components/dashboard/Products";
import Reviews from "./components/dashboard/Reviews";
import Orders from "./components/dashboard/Orders";
import OneProductPage from "./components/OneProductPage";
import Search from "./pages/Search";

function App() {
  const [count, setCount] = useState(0);
  let { id } = useParams();


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:text" element={<Search />} />
        <Route path="/product/:id" element={<OneProductPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<ReqLogin />}>
          <Route path="/profile" element={<Profile />} />
          <Route element={<ReqAdmin />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="/dashboard/users" element={<Users />} />
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/reviews" element={<Reviews />} />
              <Route path="/dashboard/orders" element={<Orders />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
