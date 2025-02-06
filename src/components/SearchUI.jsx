import { useState } from "react";
import Button from "./Button";

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
    <div className="md:flex md:flex-row justify-between md:gap-2 mb-4">
      {/* Alert when only one date is entered */}
      {showAlert && (
        <div
          role="alert"
          className="alert bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-100 px-4 py-3 rounded relative"
        >
          <strong className="font-bold">Warning: </strong>
          <span className="block sm:inline">
            Please select both &apos;From&apos; and &apos;To&apos; dates before searching.
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
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 m-2 rounded w-full text-gray-900 dark:text-gray-100"
      />

      {/* Date Inputs */}
      <input
        type="date"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 m-2 rounded w-full md:w-1/4 text-gray-900 dark:text-gray-100"
      />

      <input
        type="date"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 m-2 rounded w-full md:w-1/4 text-gray-900 dark:text-gray-100"
      />

      {/* Search Button */}
      <Button
        text="Search"
        onClick={handleSearch}
        className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 m-2 rounded hover:bg-blue-600 dark:hover:bg-blue-800 flex-1"
      />

      {/* Clear Filter Button */}
      <Button
        text="Clear"
        onClick={clearFilters}
        className="bg-gray-500 dark:bg-gray-700 text-white px-4 py-2 m-2 rounded hover:bg-gray-600 dark:hover:bg-gray-800 flex-1"
      />
    </div>
  );
};

export default SearchUI;
