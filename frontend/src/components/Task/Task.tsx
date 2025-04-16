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
  if (title.length > 55) {
    return (title.slice(0, 55) + '...')
  }
  return title
}

const Task: React.FC<TaskProps> = ({ id, title, status, dueDate }) => {

  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/tasks/${id}`)
  }
  
  return (
    <div key={id} onClick={() => handleClick()}
    className='flex flex-col bg-white rounded-xl border-1 border-grey-100 shadow-lg p-4 max-h-48 cursor-pointer '>
      <div className='flex flex-row justify-between'>
        <h2 className='font-medium wrap-anywhere w-3/5'>{shortenTitle(title)}</h2>
        <h3 className='text-xs'>{formatStatus(status)}</h3>
      </div>
      <div className='flex flex-row justify-between mt-auto'>
        <p className='text-xs pt-6 font-mono'>MOJ-{id}</p>
        <p className='text-xs pt-6 font-mono'>Due Date: {formatDate(dueDate)}</p>
      </div>
    </div>
  )

}

export default Task;