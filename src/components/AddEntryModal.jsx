import { useState, useEffect } from "react";
import { saveItem, loadItems } from "../utils/storageService";

const AddEntryModal = ({ onClose, onSave, entry }) => {
  const [title, setTitle] = useState(entry?.title || "");
  const [date, setDate] = useState(entry?.date || "");
  const [desc, setDesc] = useState(entry?.desc || "");
  const [imageUrl, setImageUrl] = useState(entry?.imageUrl || "");

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setDate(entry.date);
      setDesc(entry.desc);
      setImageUrl(entry.imageUrl);
    }
  }, [entry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !desc) {
      alert("Please fill in all fields!");
      return;
    }
    const storedEntries = loadItems();
    const updatedEntry = { id: entry?.id, title, date, desc, imageUrl };

    // Save new or edited entry to local storage
    saveItem(storedEntries, updatedEntry);
    onSave(updatedEntry);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50">
      <div className="modal-content p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {entry ? "Edit Entry" : "Add Entry"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 w-full mt-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 w-full mt-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 w-full mt-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
          />
          <textarea
            placeholder="Write your entry..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-2 w-full mt-2 h-32 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded"
          ></textarea>

          <div className="flex gap-2 mt-3">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              {entry ? "Update" : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded"
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
