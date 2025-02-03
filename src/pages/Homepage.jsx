/* eslint-disable react/prop-types */
import { useState } from "react";
import Entries from "../components/Entries";
import EntryModal from "../components/EntryModal";

const Homepage = ({ entries, onDelete }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Daily Memoir</h1> */}

      {/* Display list of diary entries */}
      <Entries entries={entries} onSelect={setSelectedEntry} onDelete={onDelete} />

      {/* Show modal when an entry is selected */}
      {selectedEntry && <EntryModal entry={selectedEntry} onClose={() => setSelectedEntry(null)} />}
    </div>
  );
};

export default Homepage;
