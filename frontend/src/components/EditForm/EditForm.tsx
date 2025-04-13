import React, { useState } from 'react'

interface FormProps {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

const EditForm: React.FC<FormProps> = ({ id, title, description, status, dueDate, createdAt, updatedAt }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="p-6 bg-white rounded-xl shadow-lg w-1/2">
        <h3 className="text-xl font-semibold mb-4">Edit Task</h3>
        <form>
          <div className="title-box mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input type="text" defaultValue={title} className="w-full p-2 border rounded-md"/>
          </div>
          <div className="description-box mb-4">
            <label className="text-sm font-semibold">Description</label>
            <textarea defaultValue={description || ''} className="w-full p-2 border rounded-md"/>
          </div>
          <div className='status-box mb-4'>
            <label className='text-sm font-semibold'>Status</label>
            <input type='text' defaultValue={status} className='w-full p-2 border rounded-md'/>
          </div>
          <div className='buttons pt-4'>
            <button type="button" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Changes
            </button>
            <button type="button" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Discard Changes
            </button>
          </div>
        </form>
      </div>
    </div>
    )
  }

export default EditForm;