import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router();
const prisma = new PrismaClient();


// Create task
router.post('/create', async (req, res) => {
  const { title, description, status, dueDate } = req.body
  
  try {
    const task = await prisma.task.create({
      data: {
        title, description, status, dueDate: new Date(dueDate)
      }
    })
    res.status(200).json(task)
  }
  catch (error) {
    res.status(400).json({error: 'Error creating task'})
  }
})

// View all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany()
    res.status(200).json(tasks)
  }
  catch (error) {
    res.status(400).json({error: 'Error getting tasks'})
  }
})

// Get task by ID
router.get('/tasks/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(id)
      }
    })
    if (!task) {
      res.status(400).json({error: `Task with id ${id} does not exist`})
    }
    res.status(200).json(task)
  }

  catch (error) {
    res.status(400).json({error: `Error viewing task of id ${id}`})
  }
})

// Update tasks
router.put('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const { title, status, description, dueDate } = req.body

  try {
    const task = await prisma.task.update({
      where: {
        id: id
      },
      data: {
        title, status, description, dueDate: new Date(dueDate)
      }
    })
    res.json(task)
  }
  catch (error) {
    res.status(400).json({error: `Error updating task of id ${id}`})
  }
})

// Delete tasks
router.delete('/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  try {
    const task = await prisma.task.delete({
      where: {
        id: id
      }
    })
    res.json(task)
  }
  catch (error) {
    res.status(400).json({ error: `Failed to delete task with ID ${id}`})
  }
})

export default router;