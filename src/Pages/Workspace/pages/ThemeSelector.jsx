import React, { useState } from "react";
import "./ThemeSelector.css";
import Navigation from "./Navigation";
import img1 from "../assets/image 1.png";
import img2 from "../assets/image 2.png";
import img3 from "../assets/Group 17.png";
import ChatBot from "../../ChatBot/ChatBot";

const ThemeSelector = ({ setTheme }) => {
  const [activeTheme, setActiveTheme] = useState("light");
  const [theme, settTheme] = useState("light");

  const handleThemeChange = (theme) => {
    setTheme(theme);
    setActiveTheme(theme);
  };

  return (
    <div className="theme-selector">
      <Navigation />
      <div className="theme_container">
        <div className="customize_theme">
          <h2 className="heading_theme">Customize the theme</h2>
          <div
            className={`theme-option ${
              activeTheme === "light" ? "active" : ""
            }`}
            onClick={() => handleThemeChange("light")}
          >
            <div className="theme-preview light-preview">
              <img src={img1} alt="Light theme preview" />
            </div>
            <p>Light</p>
          </div>
          <div
            className={`theme-option ${activeTheme === "dark" ? "active" : ""}`}
            onClick={() => handleThemeChange("dark")}
          >
            <div className="theme-preview dark-preview">
              <img src={img2} alt="Dark theme preview" />
            </div>
            <p>Dark</p>
          </div>
          <div
            className={`theme-option ${activeTheme === "blue" ? "active" : ""}`}
            onClick={() => handleThemeChange("blue")}
          >
            <div className="theme-preview blue-preview">
              <img src={img3} alt="Tail Blue theme preview" />
            </div>
            <p>Tail Blue</p>
          </div>
        </div>
        {/* <div className={`app-container ${theme}`}>
          <ThemeSelector setTheme={setTheme} />
          <Chat theme={theme} />
        </div> */}
      </div>
    </div>
  );
};

export default ThemeSelector;