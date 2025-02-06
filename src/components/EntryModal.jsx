import { useState } from "react";
import Button from "./Button";
import AddEntryModal from "./AddEntryModal";

const EntryModal = ({ entry, onClose, updateEntry }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(entry);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50">
      {/* Container EntryModal & AddEntryModal */}
      <div
        className={`p-4 rounded-lg shadow-lg max-w-lg w-full transition-opacity duration-300 bg-white dark:bg-gray-800 ${
          showEditModal ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {currentEntry?.title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{currentEntry?.date}</p>
        <img
          src={currentEntry.imageUrl}
          alt={currentEntry.title}
          className="w-full h-48 object-cover rounded-lg my-2"
        />
        <p className="text-gray-700 dark:text-gray-300">{currentEntry?.desc}</p>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <Button text="Edit" onClick={() => setShowEditModal(true)} />
          <Button text="Close" onClick={onClose} />
        </div>
      </div>

      {showEditModal && (
        <AddEntryModal
          entry={currentEntry}
          onClose={() => setShowEditModal(false)}
          onSave={(updatedEntry) => {
            setCurrentEntry(updatedEntry);
            if (updateEntry) {
              updateEntry(updatedEntry);
            }
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default EntryModal;
