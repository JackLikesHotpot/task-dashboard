import React, { useState } from 'react'
import axios from 'axios'
import formatStatus from '../../helpers/formatStatus';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const TaskForm: React.FC = ({}) => {

  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState('');
  const [formDueDate, setFormDueDate] = useState<Date | null>();
  const [missingField, setMissingField] = useState('')

  const navigate = useNavigate();
  const statuses = ['TO_DO', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED']


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formTitle.length < 1 || !formTitle.trim()) { 
      setMissingField('Title field cannot be empty.')
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/create`, {
        title: formTitle,
        status: formStatus || 'Unknown',
        description: formDescription,
        dueDate: formDueDate ? formDueDate.toISOString() : null
      })
      
      if (response.status === 200) {
        navigate('/tasks')
      }
      else {
        console.error(response.status)
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
    setMissingField('')
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormDescription(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormStatus(e.target.value);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="p-6 bg-white rounded-xl shadow-lg w-1/2" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4">Create Task</h3>
        <form>
          <div className="title-box mb-4">
            <div className='flex flex-row'>
              <label className="block text-sm font-medium">Title</label>
              <span className='text-xs text-red-400 pl-2'>{missingField}</span>
            </div>
            <input type="text" value={formTitle} 
            className="w-full p-2 border rounded-md" onChange={handleTitleChange}/>
          </div>
          <div className="description-box mb-4">
            <label className="text-sm font-semibold">Description</label>
            <textarea value={formDescription} 
            className="w-full p-2 border rounded-md" onChange={handleDescriptionChange}/>
          </div>
          <div className='status-box mb-4'>
            <label className='text-sm font-semibold'>Status</label>
            <select value={formStatus}
            className='w-full p-2 border rounded-md' onChange={handleStatusChange}>
              <option value='' disabled/>
              {statuses.map(status => (
                <option value={status}>{formatStatus(status)}</option>
              ))}
            </select>
          </div>
          <div className='datepicker-box mb-4 flex flex-col'>
            <label className='text-sm font-semibold'>Due Date</label>
            <DatePicker
              showIcon
              selected={formDueDate}
              onChange={(date) => setFormDueDate(date)}/>
          </div>
          <div className='buttons flex gap-2'>
            <button type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={(e) => handleSubmit(e)}>
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
    )
  }

export default TaskForm;