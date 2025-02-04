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
}) => {

  // State for alert
  const [showAlert, setShowAlert] = useState(false);

  // Show alert when only one date is entered
  const handleSearch = () => {
    if (!fromDate || !toDate) {
      setShowAlert(true);
      return;
    }
    filterEntries()
  };

  return (
    <div className="search-container p-4 flex flex-wrap gap-4">
      {/* DaisyUI Alert (only shown if showAlert is true */}
      {showAlert && (
        <div role="alert" className="alert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Please select both 'From' and 'To' dates before searching.</span>
          <button className="btn btn-sm btn-primary" onClick={() => setShowAlert(false)}>
            Close
          </button>
        </div>
      )}

      <input
        type="text"
        placeholder="Search diary entries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3"
      />

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

      <button
        onClick={handleSearch} // Calls handleFilter inside Homepage
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchUI;
