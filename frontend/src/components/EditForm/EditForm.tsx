import React, { useState } from 'react'
import axios from 'axios'
import formatStatus from '../../helpers/formatStatus';

interface FormProps {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  editFormClick: () => void;
}

const EditForm: React.FC<FormProps> = ({ id, title, description, status, editFormClick }) => {

  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);
  const [formStatus, setFormStatus] = useState(status);
  const statuses = ['TO_DO', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED']

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/tasks/${id}`, {
        title: formTitle,
        status: formStatus,
        description: formDescription
      })
      console.log(response)
    }
    catch (error) {
      console.log(console.error)
    }
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormDescription(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormStatus(e.target.value);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50" onClick={editFormClick}>
      <div className="p-6 bg-white rounded-xl shadow-lg w-1/2" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-semibold mb-4">Edit Task</h3>
        <form onSubmit={handleSubmit}>
          <div className="title-box mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input type="text" defaultValue={title} value={formTitle} 
            className="w-full p-2 border rounded-md" onChange={handleTitleChange}/>
          </div>
          <div className="description-box mb-4">
            <label className="text-sm font-semibold">Description</label>
            <textarea defaultValue={description || ''} value={formDescription} 
            className="w-full p-2 border rounded-md" onChange={handleDescriptionChange}/>
          </div>
          <div className='status-box mb-4'>
            <label className='text-sm font-semibold'>Status</label>
            <select defaultValue={status} value={formStatus}
            className='w-full p-2 border rounded-md' onChange={handleStatusChange}>
              {statuses.map(status => (
                <option value={status}>{formatStatus(status)}</option>
              ))}
            </select>
          </div>
          <div className='buttons flex gap-2'>
            <button type="button" 
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => handleSubmit()}>
              Save Changes
            </button>
            <button type="button" 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={editFormClick}>
              Discard Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    )
  }

export default EditForm;