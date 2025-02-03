import React from "react";

const EntryModal = ({ entry, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold">{entry.title}</h2>
        <p>{entry.date}</p>
        <img
          src={entry.image}
          alt={entry.title}
          className="w-full h-48 object-cover rounded-lg my-2"
        />
        <p>{entry.content}</p>
        <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EntryModal; // ✅ Make sure this is present
