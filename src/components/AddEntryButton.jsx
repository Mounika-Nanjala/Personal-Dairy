import React from "react";

const AddEntryButton = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg"
      onClick={onClick}
    >
      + Add Entry
    </button>
  );
};

export default AddEntryButton;
