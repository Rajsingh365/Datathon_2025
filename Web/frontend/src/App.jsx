import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CreatePlan from "./pages/CreatePlan";
import Dummy from "./pages/Dummy";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <BrowserRouter>
      <Navbar/> 
      <Routes>
        <Route path="/" element={<h1>hello</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/signup" element={<h1>Signup</h1>} />
        <Route path="/create-plan" element={<CreatePlan/>}/>
        <Route path="/dummy" element={<Dummy/>} />
      </Routes>
      <Footer/>
      <Toaster/>
    </BrowserRouter>

  )
}

export default App;
