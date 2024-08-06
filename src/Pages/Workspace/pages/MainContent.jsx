// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./MainContent.css";
// import Sidebar from "./Sidebar";
// import { RiDeleteBin6Line, RiFlagFill } from "react-icons/ri";
// import { PiChatText } from "react-icons/pi";
// import { CiCalendarDate, CiImageOn, CiText } from "react-icons/ci";
// import { TbMovie } from "react-icons/tb";
// import { BsTelephone } from "react-icons/bs";
// import { FaRegStar } from "react-icons/fa6";
// import { IoMdCheckboxOutline } from "react-icons/io";
// import { MdGif, MdOutlineEmail, MdOutlineNumbers } from "react-icons/md";

// function MainContent() {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [currentFormId, setCurrentFormId] = useState(() => {
//     const formId = localStorage.getItem("formId");
//     console.log("Initial currentFormId:", formId);
//     return formId;
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `https://formbot-backend-6.onrender.com/items/${currentFormId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setSelectedItems(response.data);
//       } catch (error) {
//         console.error(
//           "Error fetching items:",
//           error.response ? error.response.data : error.message
//         );
//       }
//     };

//     if (currentFormId) {
//       fetchData();
//     }
//   }, [currentFormId]);

//   useEffect(() => {
//     const formId = localStorage.getItem("formId");
//     if (formId) {
//       setCurrentFormId(formId);
//     }
//   }, []);

//   const handleDeleteItem = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`https://formbot-backend-6.onrender.com/deleteitem/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       await fetchData();
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

//   const handleAddSelectedItem = async (item) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "https://formbot-backend-6.onrender.com/createformitem",
//         {
//           items: [{ type: item, name: item }],
//           formId: currentFormId,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log("form item created", response.data);
//       await fetchData();
//     } catch (error) {
//       console.error("Error adding item:", error);
//     }
//   };

//   const handleUpdateItemName = async (id, newName) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `https://formbot-backend-6.onrender.com/updateitem/${id}`,
//         { name: newName },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       await fetchData();
//     } catch (error) {
//       console.error("Error updating item name:", error);
//     }
//   };

//   const renderItem = (item, index) => {
//     const commonElements = (
//       <div className="item-header">
//         <RiDeleteBin6Line
//           className="delete-icon"
//           onClick={() => handleDeleteItem(item._id)}
//         />
//         <h2>{item.name}</h2>
//       </div>
//     );
//     const iconMap = {
//       Text: <PiChatText className="item-icon" />,
//       Image: <CiImageOn className="item-icon" />,
//       Video: <TbMovie className="item-icon" />,
//       GIF: <MdGif className="item-icon" />,
//       TextInput: <CiText className="item-icon" />,
//       NumberInput: <MdOutlineNumbers className="item-icon" />,
//       EmailInput: <MdOutlineEmail className="item-icon" />,
//       PhoneInput: <BsTelephone className="item-icon" />,
//       DateInput: <CiCalendarDate className="item-icon" />,
//       RatingInput: <FaRegStar className="item-icon" />,
//       ButtonInput: <IoMdCheckboxOutline className="item-icon" />,
//     };

//     switch (item.type) {
//       case "Text":
//       case "Image":
//       case "Video":
//       case "GIF":
//       case "ButtonInput":
//         return (
//           <div className="item">
//             {commonElements}
//             <input
//               type="text"
//               className="editable-name"
//               placeholder={`Enter ${item.type.toLowerCase()} name`}
//               onChange={(e) => handleUpdateItemName(index, e.target.value)}
//             />
//             {iconMap[item.type]}
//           </div>
//         );
//       case "TextInput":
//       case "NumberInput":
//       case "EmailInput":
//       case "PhoneInput":
//       case "DateInput":
//       case "RatingInput":
//         return (
//           <div className="input-item">
//             {commonElements}
//             <p className="hint">
//               HINT: User will input a {item.type.toLowerCase()} on his form
//             </p>
//             {iconMap[item.type]}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="main-content">
//       <Sidebar addSelectedItem={handleAddSelectedItem} />
//       <div className="content-area">
//         <div className="header">
//           <RiFlagFill className="flag-icon" /> Start
//         </div>
//         <div className="items-list">
//           {selectedItems.map((item, index) => (
//             <div key={item._id} className="item-container">
//               {renderItem(item, index)}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MainContent;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MainContent.css";
import Sidebar from "./Sidebar";
import { RiDeleteBin6Line, RiFlagFill } from "react-icons/ri";
import { PiChatText } from "react-icons/pi";
import { CiCalendarDate, CiImageOn, CiText } from "react-icons/ci";
import { TbMovie } from "react-icons/tb";
import { BsTelephone } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa6";
import { IoMdCheckboxOutline } from "react-icons/io";
import { MdGif, MdOutlineEmail, MdOutlineNumbers } from "react-icons/md";

function MainContent() {
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentFormId, setCurrentFormId] = useState(() => {
    const formId = localStorage.getItem("formId");
    console.log("Initial currentFormId:", formId);
    return formId;
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://formbot-backend-6.onrender.com/items/${currentFormId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSelectedItems(response.data);
    } catch (error) {
      console.error(
        "Error fetching items:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    if (currentFormId) {
      fetchData();
    }
  }, [currentFormId]);

  useEffect(() => {
    const formId = localStorage.getItem("formId");
    if (formId) {
      setCurrentFormId(formId);
    }
  }, []);

  const handleDeleteItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://formbot-backend-6.onrender.com/deleteitem/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleAddSelectedItem = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://formbot-backend-6.onrender.com/createformitem",
        {
          items: [{ type: item, name: item }],
          formId: currentFormId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("form item created", response.data);
      await fetchData();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleUpdateItemName = async (id, newName) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://formbot-backend-6.onrender.com/updateitem/${id}`,
        { name: newName },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchData();
    } catch (error) {
      console.error("Error updating item name:", error);
    }
  };

  const renderItem = (item, index) => {
    const commonElements = (
      <div className="item-header">
        <RiDeleteBin6Line
          className="delete-icon"
          onClick={() => handleDeleteItem(item._id)}
        />
        <h2>{item.name}</h2>
      </div>
    );
    const iconMap = {
      Text: <PiChatText className="item-icon" />,
      Image: <CiImageOn className="item-icon" />,
      Video: <TbMovie className="item-icon" />,
      GIF: <MdGif className="item-icon" />,
      TextInput: <CiText className="item-icon" />,
      NumberInput: <MdOutlineNumbers className="item-icon" />,
      EmailInput: <MdOutlineEmail className="item-icon" />,
      PhoneInput: <BsTelephone className="item-icon" />,
      DateInput: <CiCalendarDate className="item-icon" />,
      RatingInput: <FaRegStar className="item-icon" />,
      ButtonInput: <IoMdCheckboxOutline className="item-icon" />,
    };

    switch (item.type) {
      case "Text":
      case "Image":
      case "Video":
      case "GIF":
      case "ButtonInput":
        return (
          <div className="item">
            {commonElements}
            <input
              type="text"
              className="editable-name"
              placeholder={`Enter ${item.type.toLowerCase()} name`}
              onChange={(e) => handleUpdateItemName(item._id, e.target.value)}
            />
            {iconMap[item.type]}
          </div>
        );
      case "TextInput":
      case "NumberInput":
      case "EmailInput":
      case "PhoneInput":
      case "DateInput":
      case "RatingInput":
        return (
          <div className="input-item">
            {commonElements}
            <p className="hint">
              HINT: User will input a {item.type.toLowerCase()} on his form
            </p>
            {iconMap[item.type]}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main-content">
      <Sidebar addSelectedItem={handleAddSelectedItem} />
      <div className="content-area">
        <div className="header">
          <RiFlagFill className="flag-icon" /> Start
        </div>
        <div className="items-list">
          {selectedItems.map((item) => (
            <div key={item._id} className="item-container">
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainContent;
