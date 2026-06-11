import { useState } from "react";
import { toast } from "react-toastify";

export default function TaskInput({ addTask }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (!text.trim()) {
      toast.error("Task content cannot be empty.");
      return;
    }

    addTask({ text, category, priority, dueDate });
    setText("");
    setCategory("Personal");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <div className="input-box advanced">
      <input
        type="text"
        placeholder="Enter a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Study">Study</option>
        <option value="Health">Health</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}