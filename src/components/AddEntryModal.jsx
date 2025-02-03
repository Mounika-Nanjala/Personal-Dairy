import React, { useState, useEffect } from "react";

const AddEntryModal = ({ onClose, onSave, entry }) => {
  const [title, setTitle] = useState(entry?.title || "");
  const [date, setDate] = useState(entry?.date || "");
  const [content, setContent] = useState(entry?.content || "");

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setDate(entry.date);
      setContent(entry.content);
    }
  }, [entry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !content) {
      alert("Please fill in all fields!");
      return;
    }
    onSave({ title, date, content });
    onClose();
  };

  return (
    <div className="modal-background">
      <div className="modal-content p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">{entry ? "Edit Entry" : "Add Entry"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mt-2"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 w-full mt-2"
          />
          <textarea
            placeholder="Write your entry..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full mt-2 h-32"
          ></textarea>

          <div className="flex gap-2 mt-3">
            <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
              {entry ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEntryModal;
