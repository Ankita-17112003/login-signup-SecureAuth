import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Otp from "./pages/Otp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Messages from "./pages/Messages.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/otppage" element={<Otp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/messeges" element={<Messages />} />
    </Routes>
  );
}
