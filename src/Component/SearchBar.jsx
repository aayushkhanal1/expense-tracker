function SearchBar({ search, setSearch }) {
  return (
    <div className="search-section">
      <div className="search-box">
        <span className="search-icon">🔎</span>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions..."
        />
      </div>
    </div>
  );
}

export default SearchBar;