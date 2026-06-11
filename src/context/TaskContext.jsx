import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const TaskContext = createContext(null);
const STORAGE_TASKS = "todo-manager/tasks";
const STORAGE_THEME = "todo-manager/theme";

const defaultCategories = ["Personal", "Work", "Study", "Health"];
const defaultPriorities = ["High", "Medium", "Low"];

function loadStoredTasks() {
  try {
    const stored = localStorage.getItem(STORAGE_TASKS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn("Failed to load tasks from localStorage", error);
    return [];
  }
}

function loadStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_THEME);
    if (stored) return stored;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  } catch (error) {
    return "light";
  }
}

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => loadStoredTasks());
  const [filter, setFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMethod, setSortMethod] = useState("custom");
  const [theme, setTheme] = useState(() => loadStoredTheme());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_TASKS, JSON.stringify(tasks));
    } catch (error) {
      console.warn("Unable to persist tasks", error);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch (error) {
      console.warn("Unable to persist theme", error);
    }
  }, [theme]);

  const addTask = ({ text, category, priority, dueDate }) => {
    const normalizedText = text.trim();
    if (!normalizedText) {
      toast.error("Please enter a valid task.");
      return;
    }

    const nextPosition = tasks.length > 0 ? Math.max(...tasks.map((task) => task.position)) + 1 : 0;
    const newTask = {
      id: Date.now(),
      text: normalizedText,
      category,
      priority,
      dueDate: dueDate || "",
      completed: false,
      createdAt: new Date().toISOString(),
      position: nextPosition,
    };

    setTasks((prev) => [...prev, newTask]);
    toast.success("Task added successfully.");
  };

  const updateTask = (id, updates) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
    toast.success("Task updated successfully.");
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task deleted successfully.");
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    toast.success("Task status updated.");
  };

  const reorderTasks = (fromIndex, toIndex) => {
    setTasks((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated.map((task, index) => ({ ...task, position: index }));
    });
    toast.info("Task order updated.");
  };

  const setThemePreference = (value) => {
    setTheme(value);
    toast.info(`${value.charAt(0).toUpperCase() + value.slice(1)} mode enabled.`);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
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
        setTheme: setThemePreference,
        categories: defaultCategories,
        priorities: defaultPriorities,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }
  return context;
}

export { TaskProvider, useTasks };
