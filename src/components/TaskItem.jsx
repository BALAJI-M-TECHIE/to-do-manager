import { useState } from "react";
import { toast } from "react-toastify";

const formatDate = (dateString) => {
  if (!dateString) return "No date";
  return new Date(dateString).toLocaleDateString();
};

export default function TaskItem({
  task,
  deleteTask,
  toggleTask,
  updateTask,
  onDragStart,
  onDragOver,
  onDrop,
  isDragEnabled,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState(task.text);
  const [editingCategory, setEditingCategory] = useState(task.category);
  const [editingPriority, setEditingPriority] = useState(task.priority);
  const [editingDueDate, setEditingDueDate] = useState(task.dueDate || "");

  const dueDateValue = task.dueDate ? new Date(task.dueDate) : null;
  const now = new Date();
  const isOverdue = dueDateValue && !task.completed && dueDateValue < now;
  const isUpcoming =
    dueDateValue && !task.completed && dueDateValue > now && dueDateValue - now <= 1000 * 60 * 60 * 24 * 2;

  const handleSave = () => {
    if (!editingText.trim()) {
      toast.error("Task text cannot be empty.");
      return;
    }

    updateTask(task.id, {
      text: editingText.trim(),
      category: editingCategory,
      priority: editingPriority,
      dueDate: editingDueDate,
    });
    setIsEditing(false);
  };

  return (
    <div
      className={`task-row ${task.completed ? "done" : ""} ${
        isOverdue ? "overdue" : ""
      }`}
      draggable={isDragEnabled}
      onDragStart={isDragEnabled ? onDragStart : undefined}
      onDragOver={isDragEnabled ? onDragOver : undefined}
      onDrop={isDragEnabled ? onDrop : undefined}
    >
      <div className="task-main">
        <button className="check-toggle" onClick={() => toggleTask(task.id)}>
          {task.completed ? "✔" : "○"}
        </button>

        <div className="task-body">
          {isEditing ? (
            <div className="edit-panel">
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <div className="edit-fields">
                <select
                  value={editingCategory}
                  onChange={(e) => setEditingCategory(e.target.value)}
                >
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Health">Health</option>
                </select>
                <select
                  value={editingPriority}
                  onChange={(e) => setEditingPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <input
                  type="date"
                  value={editingDueDate}
                  onChange={(e) => setEditingDueDate(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <>
              <div className="task-header">
                <h3>{task.text}</h3>
                <div className="badges">
                  <span className={`badge category ${task.category.toLowerCase()}`}>
                    {task.category}
                  </span>
                  <span className={`badge priority ${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
              </div>

              <div className="task-meta">
                <span>{formatDate(task.dueDate)}</span>
                {isOverdue && <span className="status overdue-label">Overdue</span>}
                {isUpcoming && <span className="status upcoming-label">Due soon</span>}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}