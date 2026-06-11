import { useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTasks } from "./context/TaskContext";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import "./styles.css";

export default function App() {
  const {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    toggleTask,
    reorderTasks,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
    sortMethod,
    setSortMethod,
    theme,
    setTheme,
  } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercent = totalTasks
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  const filteredTasks = useMemo(() => {
    const priorityRank = { High: 1, Medium: 2, Low: 3 };

    return tasks
      .filter((task) =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
      })
      .filter((task) => {
        if (categoryFilter === "all") return true;
        return task.category === categoryFilter;
      })
      .sort((a, b) => {
        if (sortMethod === "priority") {
          return priorityRank[a.priority] - priorityRank[b.priority];
        }
        return a.position - b.position;
      });
  }, [tasks, searchQuery, filter, categoryFilter, sortMethod]);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  return (
    <div className={`app ${theme}`}>
      <header className="top-bar">
        <div>
          <h1>📝 Smart Task Manager</h1>
          <p className="tagline">
            Persistent tasks, categories, priorities, and deadlines.
          </p>
        </div>

        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </header>

      <section className="stats-grid">
        <div>
          <strong>{totalTasks}</strong>
          <span>Total Tasks</span>
        </div>
        <div>
          <strong>{completedTasks}</strong>
          <span>Completed</span>
        </div>
        <div>
          <strong>{pendingTasks}</strong>
          <span>Pending</span>
        </div>
        <div>
          <strong>{completionPercent}%</strong>
          <span>Completion</span>
        </div>
      </section>

      <section className="controls-row">
        <div className="search-box">
          <input
            type="search"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="sort-note">
          {sortMethod === "priority"
            ? "Sorted by priority. Drag-and-drop disabled while sorted."
            : "Drag-and-drop available for custom ordering."}
        </div>
      </section>

      <TaskInput addTask={addTask} />

      <Filter
        filter={filter}
        setFilter={setFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        sortMethod={sortMethod}
        setSortMethod={setSortMethod}
      />

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        updateTask={updateTask}
        reorderTasks={reorderTasks}
        isDragEnabled={sortMethod === "custom"}
      />

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        theme={theme}
      />
    </div>
  );
}