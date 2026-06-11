import { useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  deleteTask,
  toggleTask,
  updateTask,
  reorderTasks,
  isDragEnabled,
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;
    reorderTasks(draggedIndex, index);
    setDraggedIndex(null);
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="empty-state">No tasks found. Add a task to get started.</p>
      ) : (
        tasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            updateTask={updateTask}
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            isDragEnabled={isDragEnabled}
          />
        ))
      )}
    </div>
  );
}