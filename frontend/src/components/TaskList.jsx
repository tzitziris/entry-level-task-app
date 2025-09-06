const TaskList = ({ tasks, loading, error }) => {
  if (loading) {
    return (
      <div className="task-list">
        <h2>Tasks</h2>
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="task-list">
        <h2>Tasks</h2>
        <div className="error">Error loading tasks: {error}</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>Tasks</h2>
        <div className="no-tasks">No tasks available. Create your first task!</div>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Tasks ({tasks.length})</h2>
      <div className="tasks-container">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <span className="task-id">#{task.id}</span>
            </div>
            <p className="task-description">{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;

