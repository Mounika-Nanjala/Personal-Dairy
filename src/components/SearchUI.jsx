/* eslint-disable react/prop-types */
const SearchUI = ({
  searchQuery,
  setSearchQuery,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  filterEntries,
}) => {
  return (
    <div className="search-container p-4 flex flex-wrap gap-4">
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
        onClick={filterEntries} // Calls handleFilter inside Homepage
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchUI;
