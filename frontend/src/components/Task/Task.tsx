import React from 'react'
import { useNavigate } from 'react-router-dom';

interface TaskProps {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

const shortenTitle = (description: string) => {
  return description.slice(0, 120)
}

const Task: React.FC<TaskProps> = ({ id, title, description, status, dueDate, createdAt, updatedAt }) => {

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/tasks/${id}`)
  }
  
  return (
    <div key={id} onClick={() => handleClick()}
    className='task-card bg-white rounded-xl border-1 border-grey-100 shadow-lg p-4 min-h-22 max-w-84 '>
      <h2 className='task-title text-md font-semibold'>{shortenTitle(title)}</h2>
      <p className='text-xs pt-6 font-mono'>MOJ-{id}</p>
    </div>
  )

}

export default Task;