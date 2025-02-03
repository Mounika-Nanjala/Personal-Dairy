/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { saveItem, loadItems } from "../utils/storageService";
import Button from "./Button";

const PopUpCard = ({ selectedCard, setSelectedCard, setEntries }) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (selectedCard) {
      setDate(selectedCard.date || "");
      setTitle(selectedCard.title || "");
      setImageUrl(selectedCard.imageUrl || "");
      setDesc(selectedCard.desc || "");
    }
  }, [selectedCard]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedItems = loadItems();

    const newItem = {
      id: selectedCard?.id || null,
      date,
      title,
      imageUrl,
      desc,
    };

    const updatedEntries = saveItem(storedItems, newItem);
    console.log("Added now", updatedEntries);
    setEntries(updatedEntries);

    setDate("");
    setTitle("");
    setImageUrl("");
    setDesc("");

    setSelectedCard(null);
  };

  return (
    <div className="editModal">
      <div className="modalContent">
        <h2 className="modalTitle">{selectedCard?.id ? "Edit Entry" : "New Entry Form"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
          <div className="formGroup">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="formGroup">
            <label>Image URL</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
          <div className="formGroup">
            <label>Description</label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
          </div>
          <div className="buttonGroup">
            <Button text={selectedCard?.id ? "Update" : "Save"} type="submit" />
            <Button
              text="Cancel"
              onClick={() => {
                console.log("Closing modal...");
                setSelectedCard((prev) => (prev !== null ? null : prev));
              }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpCard;
