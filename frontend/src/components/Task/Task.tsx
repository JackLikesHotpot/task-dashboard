import React from 'react'
import '../../../src/App.css'

interface TaskProps {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}


const processDate = (date: string) => {
  return date.split('T')[0]
}

const Task: React.FC<TaskProps> = ({ id, title, description, status, dueDate, createdAt, updatedAt }) => {

  return (
    <div key={id}
    className='task-card bg-white rounded-xl border-2 border-gray-700 shadow-md p-4 max-h-36 max-w-84'>
      <div className='flex flex-row'>
        <h2 className='task-title text-lg font-bold'>{title}</h2>
        <p className='task-status'>{status}</p>
      </div>
      <p>{description}</p>
      <p>Due Date: {processDate(dueDate)}</p>
    </div>
  )

}

export default Task;