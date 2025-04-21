import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import DeletePrompt from '../components/DeletePrompt/DeletePrompt';
import formatDate from '../helpers/formatDate';
import formatStatus from '../helpers/formatStatus';
import FormModal from '../components/FormModal/FormModal';
import { useTasks } from '../hooks/useTask';

const TaskDetails = () => {
  const [showEditForm, setShowEditForm] = useState(false)
  const [showDeletePrompt, setShowDeletePrompt] = useState(false)
  
  const { id } = useParams();
  const navigate = useNavigate();
  const task = useTasks(id);


  const handleClick = () => {
    setShowEditForm(prevValue => !prevValue)
  }

  const returnButton = () => {
    navigate('/tasks')
  }

  const deleteButton = () => {
    setShowDeletePrompt(prevValue => !prevValue)
  }

  if (!task) {
    return <></>
  }

  return (
    <div className='flex justify-center '>
      <div className='bg-white container mx-auto p-6 shadow-lg rounded-xl my-6'>
        <h2 className="text-3xl font-bold mb-4 text-center">Task Details</h2>
        <p className="mb-4 font-semibold text-lg"><strong>ID:</strong> {id}</p>
        <p className="mb-4 font-semibold text-lg wrap-anywhere"><strong>Title:</strong> {task.title}</p>
        <p className="mb-4 font-semibold text-lg wrap-anywhere"><strong>Description:</strong> {task.description || 'No description available.'}</p>
        <p className="mb-4 font-semibold text-lg"><strong>Status: </strong>{formatStatus(task.status)}</p>
        <p className="mb-4 font-semibold text-lg"><strong>Created At:</strong> <span className='font-mono'>{formatDate(task.created_at)}</span></p>
        <p className="mb-4 font-semibold text-lg"><strong>Updated At:</strong> <span className='font-mono'>{formatDate(task.updated_at)}</span></p>
        <p className="mb-4 font-semibold text-lg"><strong>Due Date:</strong> <span className='font-mono'>{formatDate(task.due_date)}</span></p>

        <div className='buttons flex justify-center gap-2 mt-20'>
            <button type='button' className="px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-700 transition duration-400 cursor-pointer"
              onClick={handleClick}>Edit Task</button>
            <button type='button' onClick={returnButton}
            className="px-6 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition duration-400 cursor-pointer">Back to Task List</button>
            <button type='button' onClick={deleteButton}
            className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-700 transition duration-400 cursor-pointer">Delete Task</button>
          </div>
      </div>

      {showEditForm && (
        <FormModal
          mode={'edit'}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          dueDate={task.due_date}
          enableTaskModal={handleClick}
        />
      )}

      {showDeletePrompt && (
        <DeletePrompt
          deletePrompt={deleteButton}
          taskId={task.id}
        />
      )}
    </div>
    );
};

export default TaskDetails;
