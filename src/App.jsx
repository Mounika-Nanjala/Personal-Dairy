import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import PopupForm from "./components/PopupForm";
import Homepage from "./pages/Homepage";
import AddEntryButton from "./components/AddEntryButton";
import AddEntryModal from "./components/AddEntryModal";
import "./App.css";

function App() {
  const [entries, setEntries] = useState(JSON.parse(localStorage.getItem("diaryEntries")) || []);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ Search text state
  const [fromDate, setFromDate] = useState(""); // ✅ From Date filter
  const [toDate, setToDate] = useState(""); // ✅ To Date filter
  const [filteredEntries, setFilteredEntries] = useState(entries); // ✅ Filtered results
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "theme-light");
  const [showPopup, setShowPopup] = useState(!localStorage.getItem("userName"));

  // Save entries to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
  }, [entries]);

  // Function to add a new entry
  const handleAdd = (newEntry) => {
    if (entries.some((entry) => entry.date === newEntry.date)) {
      alert("An entry for this date already exists!");
      return;
    }
    const updatedEntries = [{ id: Date.now(), ...newEntry }, ...entries];
    setEntries(updatedEntries);
    setFilteredEntries(updatedEntries); // Update filtered list
  };

  // Function to delete an entry
  const handleDelete = (entryId) => {
    const updatedEntries = entries.filter((entry) => entry.id !== entryId);
    setEntries(updatedEntries);
    setFilteredEntries(updatedEntries); // Update filtered list
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

  return (
    <div className={`app-container ${theme}`}>
      {showPopup && (
        <PopupForm
          onStart={({ name, theme }) => {
            setUserName(name);
            setTheme(theme);
            setShowPopup(false);
            localStorage.setItem("userName", name);
            localStorage.setItem("theme", theme);
          }}
        />
      )}

      {!showPopup && (
        <div>
          <Header setTheme={setTheme} userName={userName} theme={theme} />

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
