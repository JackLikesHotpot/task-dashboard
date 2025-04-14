import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskList from './frontend/src/pages/TaskList'; 
import TaskDetails from './frontend/src/pages/TaskDetails'; 
import TaskForm from './frontend/src/components/TaskForm/TaskForm';

const App = () => {
  return (
    <Router>
      <div className='bg-slate-300 min-h-screen min-w-screen'>
        <Routes>
          <Route path="/" element={<Navigate to='/tasks' replace />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/create" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
