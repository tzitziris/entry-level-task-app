import { useEffect, useMemo, useState } from 'react';

const TaskList = ({ tasks, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    // Reset to first page whenever tasks change
    setCurrentPage(1);
  }, [tasks]);

  const totalPages = Math.max(1, Math.ceil(tasks.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(tasks.length, startIndex + pageSize);

  const currentTasks = useMemo(() => {
    return tasks.slice(startIndex, endIndex);
  }, [tasks, startIndex, endIndex]);

  const goToPrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const goToNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

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
      <h2>
        Tasks ({startIndex + 1}
        {endIndex > startIndex ? `–${endIndex}` : ''} of {tasks.length})
      </h2>
      <div className="tasks-container">
        {currentTasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-header">
              <h3 className="task-title">{task.title}</h3>
              <span className="task-id">#{task.id}</span>
            </div>
            <p className="task-description">{task.description}</p>
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="pagination" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
          <button onClick={goToPrev} disabled={currentPage === 1}>
            Prev
          </button>
          <span style={{ opacity: 0.8 }}>Page {currentPage} of {totalPages}</span>
          <button onClick={goToNext} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;

