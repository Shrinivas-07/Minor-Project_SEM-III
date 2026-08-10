import { Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import SahiChayanQuiz from "./SahiChayanQuiz";
import Profile from "./pages/profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/quiz" element={<SahiChayanQuiz />} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
  );
}

export default App;