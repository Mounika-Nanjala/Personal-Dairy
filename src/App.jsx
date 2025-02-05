import "./index.css";
import { useState } from "react";
import Header from "./components/Header";
import PopupForm from "./components/PopupForm";
import PopUpCard from "./components/PopUpCard";
import "./App.css";
import Button from "./components/Button";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";

function App() {
  const [entries, setEntries] = useState(JSON.parse(localStorage.getItem("entries")) || []);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "theme-light");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [showPopup, setShowPopup] = useState(!localStorage.getItem("userName"));
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClose = () => {
    setShowPopup(false);
    setSelectedCard(null);
  };

  const handleEdit = (item) => {
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
        <>
          <div className={`pageContainer ${theme}`}>
            <Header setTheme={setTheme} userName={userName} openPopup={openPopup} theme={theme} />
            <Homepage entries={entries} setEntries={setEntries} />
            {/* Add New Entry Button */}
            <div className="container mx-auto p-4">
              <Button
                text="New Entry Form"
                onClick={() => {
                  // console.log("Opening modal...");
                  handleEdit({ date: "", title: "", imageUrl: "", desc: "" }); // New Entry
                }}
                className="w-full text-md bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 dark:hover:bg-blue-800 px-4 py-2 rounded"
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
