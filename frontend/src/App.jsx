import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const tasksData = await response.json()
      setTasks(tasksData)
    } catch (err) {
      console.error('Error fetching tasks:', err)
      setError('Unable to connect to server. Please make sure the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks()
  }, [])

  // Add new task to the list
  const handleAddTask = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Manage your tasks efficiently</p>
      </header>
      
      <main className="app-main">
        <div className="container">
          <TaskForm onAddTask={handleAddTask} />
          <TaskList tasks={tasks} loading={loading} error={error} />
        </div>
      </main>
    </div>
  )
}

export default App
