export default function TaskItem({ task, deleteTask, toggleTask }) {
  return (
    <div className={`task ${task.completed ? "done" : ""}`}>
      <span onClick={() => toggleTask(task.id)}>
        {task.text}
      </span>

      <div className="actions">
        <button onClick={() => toggleTask(task.id)}>
          ✔
        </button>
        <button onClick={() => deleteTask(task.id)}>
          ❌
        </button>
      </div>
    </div>
  );
}