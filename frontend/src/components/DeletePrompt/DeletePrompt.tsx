import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface PromptProps {
  deletePrompt: () => void;
  taskId: number;
}

const DeletePrompt: React.FC<PromptProps> = ({ deletePrompt, taskId }) => {

  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/tasks/${taskId}`)
      
      if (response.status !== 200) {
        return response
      }
      deletePrompt();
      navigate('/tasks')
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center" onClick={deletePrompt}>
      <div className="flex flex-col items-center bg-white p-24 rounded-xl shadow-lg gap-12" onClick={(e) => e.stopPropagation()}>
      <div className='prompt text-2xl'>Do you want to delete this task?</div>
      <div className='buttons flex gap-2'>
            <button type="button" 
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={() => handleDelete()}>
              Yes, Delete
            </button>
            <button type="button" 
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={deletePrompt}>
              No, Don't Delete
            </button>
          </div>
        </div>
    </div>
    )
  }

export default DeletePrompt;