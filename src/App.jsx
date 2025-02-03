import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PopupForm from "./components/PopupForm";
import Homepage from "./pages/Homepage";
import AddEntryButton from "./components/AddEntryButton";
import AddEntryModal from "./components/AddEntryModal";
import "./App.css";
import { loadItems, deleteItem, saveItem } from "./utils/storageService";

function App() {
  const [entries, setEntries] = useState(JSON.parse(localStorage.getItem("diaryEntries")) || []);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Search text state
  const [fromDate, setFromDate] = useState(""); // ✅ From Date filter
  const [toDate, setToDate] = useState(""); // ✅ To Date filter
  const [filteredEntries, setFilteredEntries] = useState(entries); // ✅ Filtered results
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
    const isIdExist = storedItems.findIndex((existingItem) => existingItem.id === newItem.id) >= 0;
    let updatedItems;
    if (isIdExist) {
      updatedItems = storedItems.map((existingItem) =>
        existingItem.id === newItem.id ? { ...existingItem, ...newItem } : existingItem
      );
    } else {
      updatedItems = [...storedItems, newItem];
    }
    localStorage.setItem("cards", JSON.stringify(updatedItems));
    setStoredItems(updatedItems);
  };

  // Function to filter results based on search query & date range
  const handleSearch = () => {
    const filtered = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchesText = searchQuery
        ? entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.content.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesDate = (!from || entryDate >= from) && (!to || entryDate <= to);

      return matchesText && matchesDate;
    });

    setFilteredEntries(filtered);
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
    <div>
      {showPopup && <PopupForm onStart={handlePopupStart} onClose={handleClose} />}
      {!showPopup && (
        <div className="pageContainer">
          <Header setTheme={setTheme} userName={userName} openPopup={openPopup} theme={theme} />
          {/* Add your container or main content component here */}
          {/* You might want to render your stored items here */}
          {/* Search and Date Filter Section */}
          <div className="search-container p-4 flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="Search diary entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded w-full md:w-1/3"
            />

            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border p-2 rounded w-full md:w-1/4"
            />

            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border p-2 rounded w-full md:w-1/4"
            />

            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          {/* Display filtered entries */}
          <Homepage entries={filteredEntries} onDelete={handleDelete} />

          <AddEntryButton onClick={() => setShowModal(true)} />

          {showModal && <AddEntryModal onClose={() => setShowModal(false)} onSave={handleAdd} />}
        </div>
      )}
    </div>
  );
}

export default App;
