import "./index.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import PopupForm from "./components/PopupForm";
import PopUpCard from "./components/PopUpCard";
import "./App.css";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import SearchUI from "./components/SearchUI";

function App() {
  const [entries, setEntries] = useState(JSON.parse(localStorage.getItem("diaryEntries")) || []);
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "theme-light");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [showPopup, setShowPopup] = useState(!localStorage.getItem("userName"));
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    setEntries(storedEntries);
    setFilteredEntries(storedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const handleClose = () => {
    setShowPopup(false);
    setSelectedCard(null);
  };

  const handleEdit = (item) => {
    setSelectedCard(item);
  };

  const handleDelete = (item) => {
    setSelectedCard(item);
  };

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
      {/* Welcome Popup */}
      {showPopup && <PopupForm onStart={handlePopupStart} onClose={handleClose} />}

      {/* Entry Form Modal (Only when editing or adding) */}
      {selectedCard && (
        <PopUpCard
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          setEntries={setEntries}
        />
      )}

      {/* Main App Content */}
      {!showPopup && (
        <div className={`pageContainer ${theme}`}>
          <Header setTheme={setTheme} userName={userName} openPopup={openPopup} theme={theme} />
          {/* <Homepage entries={filteredEntries} onDelete={handleDelete} /> */}
          <SearchUI
            entries={entries}
            filteredEntries={filteredEntries}
            setFilteredEntries={setFilteredEntries}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
          />

          {/* Pass filteredEntries to Homepage */}
          <Homepage entries={filteredEntries} />
          {/* Add New Entry Button */}
          <Button
            text="New Entry Form"
            onClick={() => {
              console.log("Opening modal...");
              handleEdit({ date: "", title: "", imageUrl: "", desc: "" }); // New Entry
            }}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
