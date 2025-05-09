import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TaskList from './pages/TaskList'; 
import TaskDetails from './pages/TaskDetails'; 

const App = () => {
  return (
    <Router>
      <div className='bg-slate-300 min-h-screen min-w-screen'>
        <Routes>
          <Route path="/" element={<Navigate to='/tasks' replace />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
