import { useState } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import "./styles.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  // ➕ Add Task
  const addTask = (text) => {
    if (!text.trim()) return;

    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  // ❌ Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // ✔ Toggle Complete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 🔍 Filter Tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <h1>📝 Smart Task Manager</h1>
      <p className="summary">
        {completedCount} of {tasks.length} tasks completed
      </p>

      <TaskInput addTask={addTask} />

      <Filter filter={filter} setFilter={setFilter} />

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />
    </div>
  );
}