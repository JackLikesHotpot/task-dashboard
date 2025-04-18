import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Task from '../components/Task/Task'
import FormModal from '../components/FormModal/FormModal';

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
  const [searchTerm, setSearchTerm] = useState('')

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

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const enableModal = () => {
    showNewTask(prevValue => !prevValue)
  }

  return (
    <div className='bg-slate-300 min-h-screen min-w-screen'>
      <div className='task-search flex justify-center flex-row pt-4'>
      <input 
        type='text' 
        placeholder='Search tasks...' 
        className='w-1/3 p-3 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button 
        className='p-2 bg-blue-500 text-white rounded-lg ml-4 hover:bg-blue-700 transition duration-400 cursor-pointer'
        onClick={enableModal}>Create Task</button>
      </div>
      <div className='tasks p-8 grid overflow-hidden
      xl:gap-y-4 xl:px-20 xl:grid-cols-5
      lg:gap-y-4 lg:gap-x-4 lg:grid-cols-4 
      md:gap-y-4 md:grid-cols-3
      sm:gap-4 sm:grid-cols-2'>
      {loading ? (
        <></>
      ) : filteredTasks.length > 0 && (
        filteredTasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            dueDate={task.dueDate}
          />
        ))
      )}
    </div>
      
    {!loading && filteredTasks.length === 0 && (
      <div className='prompt flex justify-center items-center'>
        <div className='text pt-15 bg-white p-24 rounded-xl shadow-lg flex flex-col'>
          <span className='font-semibold'>There are no tasks. Consider adding some?</span>
          <button 
            onClick={enableModal}
            className='mt-10 bg-blue-400 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition duration-300 cursor-pointer'>
            Add New Task</button>
        </div>
      </div>
    )
      }

    {newTask && (
      <FormModal
        mode='create'
        title=''
        status=''
        dueDate=''
        enableTaskModal={enableModal}
      />
    )}
  </div>
  )
}

export default TaskList
