import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import "./Navigation.css";
import { useNavigate } from "react-router-dom";
function Navigation() {
  const navigation = useNavigate();
  const handletotheme = () => {
    navigation("/theme");
  };
  const handletoflow = () => {
    navigation("/flow");
  };
  const handlechat = () => {
    navigation("/chat");
  };
  const handletoresponse = () => {
    navigation("/response");
  };
  return (
    <div className="navigation_container">
      <div className="navigation_all">
        <div className="navigation_search">
          <input
            type="text"
            placeholder="Enter form Name"
            className="nav_input
          "
          />
        </div>
        <div className="navigation_items">
          <button className="nav_item " onClick={handletoflow}>
            Flow
          </button>
          <button className="nav_item" onClick={handletotheme}>
            Theme
          </button>
          <button className="nav_item" onClick={handletoresponse}>
            Response
          </button>
        </div>
        <div className="navigation_buttons">
          <button className="nav share" onClick={handlechat}>
            Share
          </button>
          <button className="nav save">Save</button>
          <MdOutlineCancel
            style={{
              color: "red",
              padding: "0",
              marginRight: "10px",
              fontSize: "25px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Navigation;