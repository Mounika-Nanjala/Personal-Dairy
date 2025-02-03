import React, { useState } from "react";

function EditPopup({ onClose, onSave, item }) {
  const [date, setDate] = useState(item ? item.date : "");
  const [title, setTitle] = useState(item ? item.title : "");
  const [imageUrl, setImageUrl] = useState(item ? item.imageUrl : "");
  const [desc, setDesc] = useState(item ? item.desc : "");

  const handleSave = () => {
    const updatedItem = {
      id: item ? item.id : Date.now(),
      date,
      title,
      imageUrl,
      desc,
    };
    onSave(updatedItem);
    onClose(); 
  };

  return (
    <div className="editModal">
      <div className="modalContent">
        <h2 style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'  }}>New Entry Form</h2>
        <div className="formGroup">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label>Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label>Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="buttonGroup">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditPopup;
