import React, { useEffect, useState, useCallback } from "react";
import withAuth from "./Auth/Withauth";
import { FiFolderPlus } from "react-icons/fi";
import "./Dashboard.css";
import Newfolder from "./Newfolder";
import { IoAdd } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import axios from "axios";

const saveToLocalStorage = debounce((folders, folderData) => {
  try {
    localStorage.setItem("folders", JSON.stringify(folders));
    localStorage.setItem("folderData", JSON.stringify(folderData));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}, 300);

function Dashboard() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const [folderData, setFolderData] = useState({});
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get("https://formbot-backend-6.onrender.com/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        setUsername(data.user.username);
        localStorage.setItem("username", data.user.username);
      } catch (error) {
        console.error("Error fetching username", error);
        navigate("/login");
      }
    };
    fetchUsername();
  }, [navigate]);

  const fetchFolders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://formbot-backend-6.onrender.com/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;
      console.log("Fetched folders:", data);

      const folders = data.map((folder) => ({
        name: folder.foldername,
        id: folder._id,
      }));
      const folderDataObj = data.reduce((acc, folder) => {
        acc[folder.foldername] = folder.forms;
        return acc;
      }, {});

      setFolders(folders);
      setFolderData(folderDataObj);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };
  useEffect(() => {
    fetchFolders();
  }, []);

  const saveData = useCallback(() => {
    saveToLocalStorage(folders, folderData);
  }, [folders, folderData]);

  useEffect(() => {
    saveData();
  }, [saveData]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "settings") {
      navigate("/setting");
    } else if (selectedValue === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      sessionStorage.clear();
      navigate("/login");
    }
  };

  const handleCreateFolder = async (folderName) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://formbot-backend-6.onrender.com/newfolder",
        { name: folderName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newFolder = response.data;
      setFolders((prevFolders) => [
        ...prevFolders,
        { name: newFolder.foldername, id: newFolder._id },
      ]);
      setFolderData((prevFolderData) => ({
        ...prevFolderData,
        [newFolder.foldername]: newFolder.forms || [],
      }));
      //   console.log("Updated folderData:", newFolderData);
      //   return newFolderData;
      // });

      fetchFolders();
    } catch (error) {
      console.error(
        "Error creating folder:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteFolder = async (index) => {
    console.log("Deleting folder at index:", index);
    const folderToDelete = folders[index];
    if (!folderToDelete || !folderToDelete.id) {
      console.log("Invalid folder or folder ID");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      console.log("Deleting folder with ID:", folderToDelete.id);
      await axios.delete(`https://formbot-backend-6.onrender.com/delete/${folderToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFolders((prevFolders) => {
        const updatedFolders = prevFolders.filter((_, i) => i !== index);
        console.log("Updated folders after deletion:", updatedFolders);
        return updatedFolders;
      });

      setFolderData((prevFolderData) => {
        const newFolderData = { ...prevFolderData };
        delete newFolderData[folderToDelete.name];
        console.log("Updated folderData after deletion:", newFolderData);
        return newFolderData;
      });
      if (activeFolder === folderToDelete.name) {
        setActiveFolder(null);
      }
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleDeleteForm = async (formIndex) => {
    if (activeFolder) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(
          `https://formbot-backend-6.onrender.com/${activeFolder.id}/deleteform/${formIndex}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFolderData((prevFolderData) => {
          const updatedForms = prevFolderData[activeFolder.name].filter(
            (_, index) => index !== formIndex 
          );
          return {
            ...prevFolderData,
            [activeFolder.name]: updatedForms,
          };
        });
      } catch (error) {
        console.error("Error deleting form:", error);
      }
    }
  };

  const handleFolderClick = async (folder) => {
    setActiveFolder(folder);
  };

  const handleCreateFormbot = async () => {
    if (activeFolder) {

      const newFormbot = `New Form ${folderData[activeFolder.name].length + 1}`;
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `https://formbot-backend-6.onrender.com/${activeFolder.id}/createform`,
          { formname: newFormbot },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFolderData((prevFolderData) => {
          const newFolderData = {
            ...prevFolderData,
            [activeFolder.name]: [
              ...prevFolderData[activeFolder.name],
              newFormbot,
            ],
          };
          return newFolderData;
        });
      } catch (error) {
        console.error("Error creating formbot:", error);
      }
    }
  };

  const handleToWorkspace = () => {
    navigate("/workspace");
  };

  return (
    <div className="dashboard_container">
      <div className="dashboard_header">
        <select name="" id="dash_list" onChange={handleSelectChange}>
          <option value="dashboard" className="lists">
            {username} workspace
          </option>
          <option value="settings" className="lists">
            Settings
          </option>
          <option value="logout" className="lists">
            Log Out
          </option>
        </select>
      </div>
      <div className="dashboard_body">
        <div className="folder">
          <button
            className="create_folder"
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <FiFolderPlus style={{ left: 10, marginRight: "8px" }} />
            Create a folder
          </button>
          {folders && folders.length > 0 ? (
            folders.map((folder, index) => (
              <div
                key={folder.id} // Use folder.id as the key
                className={`folder-item ${
                  activeFolder === folder.name ? "active" : ""
                }`}
                onClick={() => handleFolderClick(folder)}
              >
                {folder.name}{" "}
                <RiDeleteBin6Line
                  style={{ color: "red", marginLeft: "5px", marginTop: "2px" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteFolder(index);
                  }}
                />
              </div>
            ))
          ) : (
            <p>No folders available.</p>
          )}
        </div>

        <div className="typebot">
          <button
            className="create_typebot"
            onClick={handleCreateFormbot}
            disabled={!activeFolder}
          >
            <IoAdd
              style={{ fontSize: "30px", fontWeight: "900", padding: "25px" }}
            />
            Create a typebot
          </button>
          <div className="bots_list">
            {activeFolder && (
              <div className="formbot-list">
                {folderData[activeFolder.name].map((formbot, index) => (
                  <li
                    key={index}
                    className="new_form"
                    onClick={handleToWorkspace}
                  >
                    {formbot}
                    <RiDeleteBin6Line
                      className="del"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteForm(index);
                      }}
                    />
                  </li>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Newfolder
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreateFolder={handleCreateFolder}
      />
    </div>
  );
}

export default withAuth(Dashboard);