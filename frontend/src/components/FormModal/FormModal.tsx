import React, { useState } from 'react'
import axios from 'axios'
import formatStatus from '../../helpers/formatStatus';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';

interface FormModalProps {
  mode: 'create' | 'edit';
  id?: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
  enableTaskModal: () => void;
}


const FormModal: React.FC<FormModalProps> = ({ mode, id, title, description, status, dueDate, enableTaskModal }) => {
  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);
  const [formStatus, setFormStatus] = useState(status);
  const [formDueDate, setFormDueDate] = useState(dueDate);
  const [missingField, setMissingField] = useState('')

  const navigate = useNavigate();
  const statuses = ['TO_DO', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formTitle?.trim().length === 0) {
      setMissingField('Title field cannot be empty.');
      return;
    }

    try {
      const formDetails = {
        title: formTitle,
        status: formStatus || 'TO_DO',
        description: formDescription,
        dueDate: formDueDate || null
      };

      const url = mode === 'create' ? `http://localhost:3000/api/create` : `http://localhost:3000/api/tasks/${id}`;
      const request = mode === 'create' ? axios.post(url, formDetails) : axios.put(url, formDetails)
      const response = await request;

      if (response.status === 200) {
        enableTaskModal();
        navigate(0);
      } 
      else {
        console.error(response.status);
      }
    }
    catch (error) {
      console.error(error)
    }
  };

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
  
    const handleDueDateChange = (date: Date | null) => {
      if (date) {
        setFormDueDate(date.toISOString())
      }
    }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50" onClick={enableTaskModal}>
      <div className="p-6 bg-white rounded-xl shadow-lg w-1/2" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4">{mode === 'create' ? 'Create Task' : 'Edit Task'}</h3>
        <form>
          <div className="title-box mb-4">
          <div className='flex flex-row'>
            <label className="block text-sm font-medium">Title</label>
            <span className='text-xs text-red-400 pl-2'>{missingField}</span>
          </div>
          <input type="text" defaultValue={title} value={formTitle} data-cy='title-input'
          className="w-full p-2 border rounded-md" onChange={handleTitleChange}/>
          </div>
          <div className="description-box mb-4">
            <label className="text-sm font-semibold">Description</label>
            <textarea defaultValue={description || ''} value={formDescription} data-cy='description-input'
            className="w-full p-2 border rounded-md" onChange={handleDescriptionChange}/>
          </div>
          <div className='status-box mb-4'>
            <label className='text-sm font-semibold'>Status</label>
            <select defaultValue='' value={formStatus} data-cy='status-select'
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
              showIcon data-cy='datepicker'
              selected={formDueDate ? new Date(formDueDate) : null}
              dateFormat="dd/MM/yyyy"
              onChange={handleDueDateChange}/>
          </div>
          {mode === 'edit' && (
            <div className='buttons flex gap-2'>
              <button type="button" data-cy='save-button'
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                onClick={(e) => handleSubmit(e)}>
                Save Changes
              </button>
              <button type="button" data-cy='discard-button'
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                onClick={enableTaskModal}>
                Discard Changes
              </button>
            </div>
          )}
          {mode === 'create' && (
          <div className='buttons flex gap-2'>
            <button type="submit" data-cy='create-button'
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
              onClick={(e) => handleSubmit(e)}>
              Create Task
            </button>
          </div>
          )}
        </form>
      </div>
    </div>
    )
}

export default FormModal