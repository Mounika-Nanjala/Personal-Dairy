/* eslint-disable react/prop-types */
const SearchUI = ({
  entries,
  setFilteredEntries,
  searchQuery,
  setSearchQuery,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
}) => {
  const handleFilter = () => {
    if (!searchQuery && !fromDate && !toDate) {
      setFilteredEntries(entries); // Show full list if no filters are applied
      return;
    }

    const filtered = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchesText = searchQuery
        ? entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          entry.content.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesDate = (!from || entryDate >= from) && (!to || entryDate <= to);

      return matchesText && matchesDate;
    });

    setFilteredEntries(filtered);
  };

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
        onClick={handleFilter} // Calls handleFilter inside SearchUI
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchUI;
