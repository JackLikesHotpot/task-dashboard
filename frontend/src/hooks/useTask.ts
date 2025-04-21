import { useState, useEffect } from 'react'
import axios from 'axios'

interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  due_date: string;
  created_at: string;
  updated_at: string;
}

export function useTasks(id: string | undefined) {

  if (id) {
    const [task, setTask] = useState<Task>()

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

    return task
  }
}