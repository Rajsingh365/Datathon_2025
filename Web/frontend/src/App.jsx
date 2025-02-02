import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import HomeLayout from "./pages/HomeLayout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import UserChurnPage from "./pages/UserChrunPage";
import SubscriptionDetails from "./pages/SubscriptionDetails";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

function App() {

  return (
    <BrowserRouter>
      <Navbar/> 
      <Routes>
        <Route path="/" element={<HomeLayout/>} />
        <Route path="/dashboard" element={<HomePage/>} />
        <Route path="/user-chrun-page" element={<UserChurnPage/>} />
        <Route path="/subscriptions-details" element={<SubscriptionDetails/>} />
        <Route path="/users/:userId" element={<UserPage />} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/signup" element={<h1>Signup</h1>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
