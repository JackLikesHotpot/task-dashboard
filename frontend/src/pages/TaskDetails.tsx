import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import EditForm from '../components/EditForm/EditForm';

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

const TaskDetails = () => {
  const [task, setTask] = useState<Task>()
  const [showEditForm, setShowEditForm] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/tasks/${id}`);
        setTask(response.data)
      } 
      catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [id]);

  const formatStatus = (status: string | undefined) => {
    if (status) {
      const taskStatuses = {
        'TO_DO' : 'To Do',
        'BLOCKED': 'Blocked',
        'COMPLETED': 'Completed',
        'IN_PROGRESS': 'In Progress'
      }
      return taskStatuses[status] || 'Unknown'
    }
  }

  const formatDate = (isoDate: string | undefined) => {
    if (isoDate) {
      return (`${new Date(isoDate).toLocaleTimeString()}, ${new Date(isoDate).toLocaleDateString()}`);
    }
    return ''
  }

  const handleClick = () => {
    setShowEditForm(prevValue => !prevValue)
  }

  const returnButton = () => {
    navigate('/tasks')
  }

  if (!task) {
    return <p className="text-center font-mono text-lg">Loading...</p>
  }


  return (
    <div className={`${showEditForm ? 'bg-gray-200' : 'bg-white'}`}>
      <div className={`container mx-auto p-6 shadow-lg rounded-xl mt-6 `}>
        <h2 className="text-3xl font-bold mb-4 text-center">Task Details</h2>
        <p className="mb-4 font-semibold text-lg"><strong>ID:</strong> {id}</p>
        <p className="mb-4 font-semibold text-lg"><strong>Title:</strong> {task.title}</p>
        <p className="mb-4 font-semibold text-lg"><strong>Description:</strong> {task.description || 'No description available.'}</p>
        <p className="mb-4 font-semibold text-lg"><strong>Status:</strong> {formatStatus(task.status)}</p>
        <p className="mb-4 font-semibold text-lg"><strong>Created At:</strong> <span className='font-mono'>{formatDate(task.createdAt)}</span></p>
        <p className="mb-4 font-semibold text-lg"><strong>Updated At:</strong> <span className='font-mono'>{formatDate(task.updatedAt)}</span></p>
        <p className="mb-4 font-semibold text-lg"><strong>Due Date:</strong> <span className='font-mono'>{formatDate(task.dueDate)}</span></p>

        <div className='buttons'>
          <div className="text-center mt-15 gap-4">
            <button type='button' className="px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition duration-400"
              onClick={handleClick}>Edit Task</button>
            <button type='button' onClick={returnButton}
            className="px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition duration-400">Back to Task List</button>
            <a className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-700 transition duration-400">Delete Task</a>
          </div>
        </div>
      </div>

      {showEditForm && (
        <EditForm
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          dueDate={task.dueDate}
          createdAt={task.createdAt}
          updatedAt={task.updatedAt}
          editFormClick={handleClick}
        />
      )}
    </div>
    );
};

export default TaskDetails;
