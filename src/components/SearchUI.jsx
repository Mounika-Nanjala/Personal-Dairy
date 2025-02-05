/* eslint-disable react/prop-types */
import { useState } from "react";

const SearchUI = ({
  searchQuery,
  setSearchQuery,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  filterEntries,
  clearFilters,
}) => {
  // State for alert
  const [showAlert, setShowAlert] = useState(false);

  // Show alert only if one date is entered but not the other
  const handleSearch = () => {
    if ((!fromDate && toDate) || (fromDate && !toDate)) {
      setShowAlert(true);
      return;
    }
    setShowAlert(false);
    filterEntries(); // Always filter, even if only text search is applied
  };
  return (
    <div className="search-container p-4 flex flex-wrap gap-4">
      {/* Alert when only one date is entered */}
      {showAlert && (
        <div
          role="alert"
          className="alert bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        >
          <strong className="font-bold">Warning: </strong>
          <span className="block sm:inline">
            Please select both 'From' and 'To' dates before searching.
          </span>
          <button
            onClick={() => setShowAlert(false)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            ✖
          </button>
        </div>
      )}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search diary entries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3"
      />

      {/* Date Inputs */}
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="border p-2 rounded w-full md:w-1/4"
      />

      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="border p-2 rounded w-full md:w-1/4"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch} // Calls handleFilter inside Homepage
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>

      {/* Clear Filter Button */}
      <button
        onClick={clearFilters}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Clear
      </button>
    </div>
  );
};

export default SearchUI;
