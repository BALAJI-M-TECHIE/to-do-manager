export default function Filter({
  filter,
  setFilter,
  categoryFilter,
  setCategoryFilter,
  sortMethod,
  setSortMethod,
}) {
  return (
    <div className="filters">
      <div className="status-filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "pending" ? "active" : ""}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      <div className="category-sort">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All categories</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Health">Health</option>
        </select>
        <select
          value={sortMethod}
          onChange={(e) => setSortMethod(e.target.value)}
        >
          <option value="custom">Custom order</option>
          <option value="priority">Priority order</option>
        </select>
      </div>
    </div>
  );
}