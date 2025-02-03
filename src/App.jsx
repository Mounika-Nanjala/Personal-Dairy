import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PopupForm from "./components/PopupForm";
import "./App.css";
import { loadItems, deleteItem, saveItem } from "./utils/storageService";
import { AddEntryButton } from "./components/AddEntryButton";

function App() {
  const [isEditVisible, setEditlVisible] = useState(false);
  const [isAddVisible, setaddVisible] = useState(false);
  const [storedItems, setStoredItems] = useState(JSON.parse(localStorage.getItem("cards")) || []);
  const [card, setCard] = useState({});
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "theme-light");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [showPopup, setShowPopup] = useState(!localStorage.getItem("userName"));

  const handleClose = () => {
    setEditlVisible(false);
    setaddVisible(false);
    setShowPopup(false);
  };

  const handleAdd = () => {
    setaddVisible(true);
  };

  const handleEdit = (item) => {
    setEditlVisible(true);
    setCard(item);
  };

  const handleDelete = (itemDel) => {
    setStoredItems((prevItems) => deleteItem(prevItems, itemDel));
  };

  const handleSave = (newItem) => {
    setStoredItems((prevItems) => saveItem(prevItems, newItem));
  };

  useEffect(() => {
    setStoredItems(loadItems());
  }, []);

  const handlePopupStart = ({ name, theme }) => {
    setUserName(name);
    setTheme(theme);
    setShowPopup(false);
    localStorage.setItem("userName", name);
    localStorage.setItem("theme", theme);
  };

  const openPopup = () => {
    setShowPopup(true);
  };

  return (
    <div>
      {showPopup && <PopupForm onStart={handlePopupStart} onClose={handleClose} />}
      {!showPopup && (
        <div className="pageContainer">
          <Header setTheme={setTheme} userName={userName} openPopup={openPopup} theme={theme} />
          {/* Add your container or main content component here */}
          {/* You might want to render your stored items here */}
          {/* <AddEntryButton />  //calling the btn here */}
        </div>
      )}
    </div>
  );
}

export default App;
