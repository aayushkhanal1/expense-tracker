function FilterButtons({ filter, setFilter }) {
  return (
    <div className="filter-buttons">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        All
      </button>

      <button
        className={filter === "income" ? "active" : ""}
        onClick={() => setFilter("income")}
      >
        Income
      </button>

      <button
        className={filter === "expense" ? "active" : ""}
        onClick={() => setFilter("expense")}
      >
        Expense
      </button>
    </div>
  );
}

export default FilterButtons;