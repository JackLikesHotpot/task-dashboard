import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Task from '../components/Task/Task'
import TaskForm from '../components/TaskForm/TaskForm';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

const TaskList = () => {
  
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, showNewTask] = useState(false)
  const [loading, setLoading] = useState(true)
  const statuses = ['TO_DO', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED']

  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/tasks')
        setTasks(response.data)
      }
    catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  };
  fetchData();
  }, [])

  const addTaskButton = () => {
    showNewTask(true)
  }

  return (
    <div className='bg-slate-300 min-h-screen min-w-screen'>
      <div className='tasks'>
        {loading ? (
        <></>
        ) : tasks.length > 0 ? tasks.map(task => (
        <Task
          id={task.id}
          title={task.title}
          status={task.status}
          dueDate={task.dueDate}
        />
      )) : 
      <div className='prompt flex justify-center items-center min-h-screen'>
        <div className='text pt-15 bg-white p-24 rounded-xl shadow-lg flex flex-col'>
          <span className='font-semibold'>There are no tasks. Consider adding some?</span>
          <button 
            onClick={addTaskButton}
            className='mt-10 bg-blue-400 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-300'>
            Add New Task</button>
        </div>
      </div>
      }
    </div>

    {newTask && (
      <TaskForm/>
    )}
  </div>
  )
}

export default TaskList
