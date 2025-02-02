import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreatePlan from "./pages/CreatePlan";
import Dummy from "./pages/Dummy";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import UserChurnPage from "./pages/UserChrunPage";
import SubscriptionDetails from "./pages/SubscriptionDetails";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { Maps } from "./pages/Maps";

function App() {

  return (
    <BrowserRouter>
      <Navbar/> 
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/dashboard" element={<HomePage/>} />
        <Route path="/user-chrun-page" element={<UserChurnPage/>} />
        <Route path="/subscriptions-details" element={<SubscriptionDetails/>} />
        <Route path="/users/:userId" element={<UserPage />} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/signup" element={<h1>Signup</h1>} />
        <Route path="/create-plan" element={<CreatePlan/>}/>
        <Route path="/dummy" element={<Dummy/>} />
        <Route path="/maps" element={<Maps/>} />

      </Routes>
      <Footer/>
      <Toaster/>
    </BrowserRouter>

  )
}

export default App;
