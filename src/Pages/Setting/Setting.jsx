import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { MdOutlineMail, MdOutlinePersonOutline } from "react-icons/md";
import "./Setting.css";

function Setting() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const userId = localStorage.getItem("userId");

  if (!userId) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); 
    sessionStorage.clear();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { username, email, password, confirmPassword } = formData;

    const newErrors = {};
    if (!username) newErrors.username = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Old password is required";
    if (!confirmPassword) newErrors.confirmPassword = "New password is required";
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token"); 
      const response = await fetch(`https://formbot-backend-6.onrender.com/update/${userId}`, { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({
          name: username,
          email,
          currentPassword: password,
          newPassword: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User updated successfully!");
      } else {
        setErrors(data.errors || { message: data.msg });
      }
    } catch (error) {
      setErrors({ message: "An error occurred while updating the user." });
    }
  };

  return (
    <div className="login_container">
      <div className="login_form_container">
        <form className="login_form" onSubmit={handleSubmit}>
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Settings</h1>
          <div className="setting_input">
            <MdOutlinePersonOutline className="setting_icons" />
            <input
              className="login_input"
              type="text"
              name="username"
              placeholder="    Name"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          {errors.username && <p className="error">{errors.username}</p>}
          <div className="setting_input">
            <MdOutlineMail className="setting_icons" />
            <input
              className="login_input"
              type="text"
              name="email"
              placeholder="    Update Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}
          <div className="setting_input">
            <CiLock className="setting_icons" />
            <input
              className="login_input"
              type="password"
              name="password"
              placeholder="    Old Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          <div className="setting_input">
            <CiLock className="setting_icons" />
            <input
              className="login_input"
              type="password"
              name="confirmPassword"
              placeholder="    New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          {message && <p className="message">{message}</p>}
          <button type="submit" className="login_button">Update</button>
        </form>
      </div>
      <div className="logout">
        <button className="logout_button" onClick={handleLogout}>
          <IoIosLogOut
            style={{
              marginRight: "5px",
              fontSize: "20px",
            }}
          />
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Setting;
