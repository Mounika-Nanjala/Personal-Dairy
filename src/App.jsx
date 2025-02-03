import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PopupForm from "./components/PopupForm";
import EditPopup from "./components/Editpopup";
import "./App.css";

function App() {
  const [isEditVisible, setEditlVisible] = useState(false);
  const [isAddVisible, setAddVisible] = useState(false);
  const [storedItems, setStoredItems] = useState(
    JSON.parse(localStorage.getItem("cards")) || []
  );
  const [card, setCard] = useState({});
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "theme-light"
  );
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [showPopup, setShowPopup] = useState(!localStorage.getItem("userName"));
  const [showEditPopup, setShowEditPopup] = useState(false); 
  const [selectedCard, setSelectedCard] = useState(null); 

  const handleClose = () => {
    setEditlVisible(false);
    setAddVisible(false);
    setShowPopup(false);
    setShowEditPopup(false); 
  };

  const handleAdd = () => {
    setAddVisible(true);
  };

  const handleEdit = (item) => {
    setSelectedCard(item);
    setShowEditPopup(true); 
  };

  const handleDelete = (itemDel) => {
    const updatedItems = storedItems.filter((item) => item.id !== itemDel.id);
    localStorage.setItem("cards", JSON.stringify(updatedItems));
    setStoredItems(updatedItems);
  };

  const handleSave = (newItem) => {
    if (storedItems.length === 0) {
      newItem.id = 1;
    }

    if (!newItem.id) {
      const maxId = Math.max(...storedItems.map((item) => item.id));
      newItem.id = maxId + 1;
    }

    const isIdExist =
      storedItems.findIndex((existingItem) => existingItem.id === newItem.id) >=
      0;

    let updatedItems;
    if (isIdExist) {
      updatedItems = storedItems.map((existingItem) =>
        existingItem.id === newItem.id
          ? { ...existingItem, ...newItem }
          : existingItem
      );
    } else {
      updatedItems = [...storedItems, newItem];
    }

    localStorage.setItem("cards", JSON.stringify(updatedItems));
    setStoredItems(updatedItems);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cards")) || [];
    setStoredItems(items);
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
    <div className="appContainer">
      {showPopup && (
        <PopupForm onStart={handlePopupStart} onClose={handleClose} />
      )}
      {showEditPopup && (
        <EditPopup
          onClose={handleClose}
          onSave={handleSave}
          item={selectedCard} 
        />
      )}
      {!showPopup && (
        <div className={`pageContainer ${theme}`}>
          <Header
            setTheme={setTheme}
            userName={userName}
            openPopup={openPopup}
            theme={theme}
          />
          <button className="btn btn-outline btn-accent" onClick={() => handleEdit(storedItems[0])}>
            New Entry Form
          </button>

          <div className="mainContent">
            {storedItems.map((item) => (
              <div key={item.id} className="itemCard">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <button
                  className="btn btn-outline btn-accent"
                  onClick={() => handleEdit(item)} 
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline btn-danger"
                  onClick={() => handleDelete(item)} >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
