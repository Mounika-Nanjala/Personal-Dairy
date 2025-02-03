import React from "react";
import DiaryEntryCard from "./DiaryEntryCard";

const Entries = ({ entries, onSelect, onDelete }) => {
  if (!entries || entries.length === 0) {
    return <p className="text-center text-gray-500">No diary entries found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {entries.map((entry) => (
        <DiaryEntryCard
          key={entry.id}
          entry={entry}
          onClick={() => onSelect(entry)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Entries;
