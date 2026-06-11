import { useState } from "react";

export default function TaskInput({ addTask }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    addTask(text);
    setText("");
  };

  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Enter a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}