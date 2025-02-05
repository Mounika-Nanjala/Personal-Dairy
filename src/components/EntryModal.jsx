import { useState } from "react";
import Button from "./Button";
import AddEntryModal from "./AddEntryModal";

const EntryModal = ({ entry, onClose, updateEntry }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState(entry); // Save current entry

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold">{currentEntry?.title}</h2>
        <p>{currentEntry?.date}</p>
        <img
          src={currentEntry.imageUrl}
          alt={currentEntry.title}
          className="w-full h-48 object-cover rounded-lg my-2"
        />
        <p>{entry.desc}</p>

        {/* Edit button */}
        <div className="flex justify-between mt-4">
          <Button text="Edit" onClick={() => setShowEditModal(true)} />
          <Button text="Close" onClick={onClose} />
        </div>
      </div>

      {/* Edit-Modal (will be displayed, if showEditModal is true) */}
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
