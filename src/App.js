import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Import pages
import LandingPage from "./Pages/landingPage/LandingPage";
import Register from "./Pages/LoginandSignupPage/Register";
import Login from "./Pages/LoginandSignupPage/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Setting from "./Pages/Setting/Setting";
import Workspace from "./Pages/Workspace/Workspace";
import ThemeSelector from "./Pages/Workspace/pages/ThemeSelector";
import Response from "./Pages/Workspace/pages/Response";
import ChatBot from "./Pages/ChatBot/ChatBot";

const App = () => {
  const [theme, setTheme] = useState("light");

  const RoutesComponent = () => (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="/theme" element={<ThemeSelector />} />
      <Route path="/flow" element={<Workspace />} />
      <Route path="/response" element={<Response />} />
      <Route path="/chat" element={<ChatBot />} />
    </Routes>
  );

  return (
    <div className={`App ${theme}`}>
      <Router>
        <RoutesComponent />
      </Router>
    </div>
  );
};

export default App;
