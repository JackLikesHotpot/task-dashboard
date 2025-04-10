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
  const [toDoTasks, setToDoTasks] = useState<Task[]>([]) 
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]) 
  const [inProgressTasks, setInProgressTasks] = useState<Task[]>([]) 
  const [blockedTasks, setBlockedTasks] = useState<Task[]>([]) 
  
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

  useEffect(() => {
    setToDoTasks(tasks.filter(
      task => task.status === 'TO_DO'
    ))

    setCompletedTasks(tasks.filter(
      task => task.status === 'COMPLETED'
    ))    
    
    setBlockedTasks(tasks.filter(
      task => task.status === 'BLOCKED'
    ))    
    
    setInProgressTasks(tasks.filter(
      task => task.status === 'IN_PROGRESS'
    ))
  }, [tasks])

  return (
    <div className='bg-slate-300 min-h-screen min-w-screen'>
      <div className='tasks'>
      <div className='to-do-tasks'>
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
  </div></div>
  )
}

export default App
