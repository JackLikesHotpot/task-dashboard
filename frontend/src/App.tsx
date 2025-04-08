import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Task from './components/Task/Task'
import '../src/App.css'

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

const App = () => {
  
  const [tasks, setTasks] = useState<Task[]>([])
  
  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/tasks')
        setTasks(response.data)
      }
    catch (error) {
      console.error(error)
    }
  };
  fetchData();
  }, [])

  return (
    <div className='bg-slate-300 min-h-screen min-w-screen'>
      {tasks ? tasks.map(task => (
        <Task
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          dueDate={task.dueDate}
          createdAt={task.createdAt}
          updatedAt={task.updatedAt}
        />
      )) : 
      <div className='text'><span>There are no tasks. Consider adding some?</span>
      </div>}
    </div>
  )
}

export default App
