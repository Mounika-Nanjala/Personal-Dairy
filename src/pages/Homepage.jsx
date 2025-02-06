import { useState, useEffect } from "react";
import Entries from "../components/Entries";
import EntryModal from "../components/EntryModal";
import SearchUI from "../components/SearchUI";
import { saveItem, loadItems, deleteItem } from "../utils/storageService";

const Homepage = ({ entries, setEntries }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState([]); // Initially show all entries
  const [isFiltered, setIsFiltered] = useState(false); // Track if search is applied
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  useEffect(() => {
    const savedEntries = loadItems(); // Load entries from localStorage
    setEntries(savedEntries); // Set entries in the state
  }, [setEntries]);

  useEffect(() => {
    setFilteredEntries(entries); // Always show all entries initially
  }, [entries]);

  const handleFilter = () => {
    if (!searchQuery && !fromDate && !toDate) {
      setIsFiltered(false);
      setCurrentPage(1); // Reset to first page
      return;
    }

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
    setCurrentPage(1); // Reset pagination to first page when filtering
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFromDate("");
    setToDate("");
    setFilteredEntries(entries);
    setIsFiltered(false);
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  // Calculate pagination details
  const displayedEntries = isFiltered ? filteredEntries : entries; // Use filtered results if search is applied
  const totalPages = Math.ceil(displayedEntries.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = displayedEntries.slice(indexOfFirstEntry, indexOfLastEntry);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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

  const handleDelete = (id) => {
    // Delete entry from both state and localStorage
    const updatedEntries = deleteItem(entries, { id });
    setEntries(updatedEntries);
    setFilteredEntries(updatedEntries);
  };

  return (
    <div className="container mx-auto p-4">
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

      {/* Display Entries (Paginated List) */}
      <Entries
        // entries={isFiltered ? filteredEntries : entries}
        onSelect={setSelectedEntry}
        onDelete={handleDelete}
        entries={
          isFiltered
            ? filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry)
            : entries.slice(indexOfFirstEntry, indexOfLastEntry)
        } // Show full list unless filtered
      />

      {/* Pagination Controls */}
      <div className="pagination flex justify-center mt-4">
        <button
          className="btn btn-outline bg-gray-600 dark:bg-gray-800 text-white hover:text-gray-800 dark:text-slate-100 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:bg-gray-500 dark:disabled:bg-gray-700 disabled:text-slate-400 disabled:cursor-not-allowed dark:disabled:text-gray-400"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 mt-3 text-gray-800 dark:text-gray-100">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-outline bg-gray-600 dark:bg-gray-800 text-white hover:text-gray-800 dark:text-slate-100 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:bg-gray-500 dark:disabled:bg-gray-700 disabled:text-slate-400 disabled:cursor-not-allowed dark:disabled:text-gray-400"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

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
