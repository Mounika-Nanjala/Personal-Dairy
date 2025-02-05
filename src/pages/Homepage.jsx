/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Entries from "../components/Entries";
import EntryModal from "../components/EntryModal";
import SearchUI from "../components/SearchUI";
import { saveItem, loadItems } from "../utils/storageService";

const Homepage = ({ entries, setEntries }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState([]); // Initially show all entries
  const [isFiltered, setIsFiltered] = useState(false); // Track if search is applied
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    setFilteredEntries(entries); // Always show all entries initially
  }, [entries]);

  const handleFilter = () => {
    if (!entries || entries.length === 0) return;

    const filtered = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchesText = searchQuery
        ? (entry.title && entry.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (entry.content && entry.content.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;

      const matchesDate = (!from || entryDate >= from) && (!to || entryDate <= to);

      return matchesText && matchesDate;
    });

    setFilteredEntries(filtered);
    setIsFiltered(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFromDate("");
    setToDate("");
    setFilteredEntries(entries);
    setIsFiltered(false);
  };

  const updateEntry = (updatedEntry) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === updatedEntry.id ? updatedEntry : entry
    );

    setEntries(updatedEntries);
    saveItem(updatedEntries, updatedEntry);

    if (isFiltered) {
      setFilteredEntries(
        updatedEntries.filter((entry) =>
          filteredEntries.some((filteredEntry) => filteredEntry.id === entry.id)
        )
      );
    }
  };

  // const handleDelete = (id) => {
  //   const updatedEntries = entries.filter((entry) => entry.id !== id);
  //   // setEntries(updatedEntries); // Updates `entries` state in `App.jsx`
  // };

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Daily Memoir</h1> */}

      {/* Search UI inside Homepage */}
      <SearchUI
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        filterEntries={handleFilter}
        clearFilters={clearFilters} // Pass clear function
      />

      {/* Display Entries (Full List or Filtered) */}
      <Entries
        entries={isFiltered ? filteredEntries : entries} // Show full list unless filtered
        onSelect={setSelectedEntry}
        // onDelete={handleDelete}
      />

      {/* Show modal when an entry is selected */}
      {selectedEntry && (
        <EntryModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          updateEntry={updateEntry}
        />
      )}
    </div>
  );
};

export default Homepage;
