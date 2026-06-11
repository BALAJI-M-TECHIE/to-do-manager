import TaskItem from "./TaskItem";

export default function TaskList({ tasks, deleteTask, toggleTask }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found 😴</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        ))
      )}
    </div>
  );
}