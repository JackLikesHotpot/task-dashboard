import { useEffect, useState } from "react";
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

export function useAllTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/tasks')
        setTasks(response.data)
      }
    catch (error) {
      console.error(error)
    }
    finally {
      setLoading(false)
    }
  };
  fetchData();
  }, [])

  return { tasks, loading }
}