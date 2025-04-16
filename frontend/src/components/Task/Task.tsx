import React from 'react'
import { useNavigate } from 'react-router-dom';
import formatStatus from '../../helpers/formatStatus';
import formatDate from '../../helpers/formatDate';

interface TaskProps {
  id: number;
  title: string;
  status: string;
  dueDate: string;
}

const shortenTitle = (title: string) => {
  return title.slice(0, 120)
}

const Task: React.FC<TaskProps> = ({ id, title, status, dueDate }) => {

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/tasks/${id}`)
  }
  
  return (
    <div key={id} onClick={() => handleClick()}
    className='task-card bg-white rounded-xl border-1 border-grey-100 shadow-lg p-8 '>
      <div className='flex flex-row justify-between'>
        <h2 className='task-title text-md font-semibold'>{shortenTitle(title)}</h2>
        <h3 className='task-status text-md'><strong>Status: </strong>{formatStatus(status)}</h3>
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-xs pt-6 font-mono'>MOJ-{id}</p>
        <p className='text-xs pt-6 font-mono'>Due Date: {formatDate(dueDate)}</p>
      </div>
    </div>
  )

}

export default Task;