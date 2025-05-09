import request from 'supertest';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import taskRoutes from '../src/routes/taskRoutes';

const prisma = new PrismaClient();
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      task: {
        findMany: jest.fn().mockResolvedValue([
          { 
            id: 999, 
            title: 'completed task', 
            description: 'desc', 
            status: 'COMPLETED', 
            due_date: new Date(Date.now()),
            created_at: new Date('2025-01-01')
          },
          {
            id: 998,
            title: 'progress task',
            description: '',
            status: 'IN_PROGRESS',
            due_date: new Date('2025-12-31'),
            created_at: new Date('2022-01-01')
          },
          {
            id: 997,
            title: 'blocked task',
            description: 'desc',
            status: 'BLOCKED',
            due_date: new Date('2025-12-31'),
            created_at: new Date('2020-01-01')
          }
        ]),
        create: jest.fn().mockResolvedValue({
          id: 1,
          title: 'new task',
          description: 'new description',
          status: 'TO_DO',
          due_date: new Date('2025-12-31'),
          created_at: new Date('2020-01-01')
        }),
        update: jest.fn().mockResolvedValue({
          id: 999,
          title: 'changed name',
          description: 'changed desc',
          status: 'COMPLETED',
          due_date:  new Date('2025-01-01'),
          created_at: new Date('2020-01-01'),
        }),
        delete: jest.fn(),
        findUnique: jest.fn().mockResolvedValue({ 
          id: 999, 
          title: 'completed task', 
          description: 'desc', 
          status: 'COMPLETED', 
          due_date:  new Date('2025-01-01'),
          created_at: new Date('2020-01-01')
        }),
    },
    }))
  }
})

const server = express();
server.use(express.json())
server.use('/api', taskRoutes)

const generateSampleData = async () => {
  await prisma.task.create({
    data: {
      id: 999,
      title: 'task',
      description: 'desc',
      status: 'COMPLETED',
      due_date: new Date(Date.now()),
      created_at: new Date('2025-01-01')
    }
  })

  await prisma.task.create({
    data: {
      id: 998,
      title: 'progress task',
      description: '',
      status: 'IN_PROGRESS',
      due_date: new Date(Date.now()),
      created_at: new Date('2022-01-01')
    }
  })

  await prisma.task.create({
    data: {
      id: 997,
      title: 'blocked task',
      description: 'desc',
      status: 'BLOCKED',
      due_date: new Date(Date.now()),
      created_at: new Date('2020-01-01')
    }
  })
}

describe('Test API calls', () => {

  beforeEach(async () => {
    await generateSampleData();
  });

  it('should GET all tasks', async () => {
    const res = await request(server).get(`/api/tasks`)
    expect(res.statusCode).toBe(200)
    expect(res.body.data).toHaveLength(3)
  })

  it('should GET a task with a specific id', async () => {
    const res = await request(server).get(`/api/tasks/999`)
    expect(res.statusCode).toBe(200)
    expect(res.body.data).toMatchObject({
      id: 999,
      title: 'completed task'
    })
  }),
  
  it('should POST a new task successfully', async () => {
    const task = {
      title: 'new task',
      description: 'new description',
      status: 'TO_DO',
      due_date: new Date('2026-01-01'),
    }

    const res = await request(server).post('/api/create').send(task);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toMatchObject({
      id: 1,
      title: 'new task',
      description: 'new description',
      status: 'TO_DO',
      due_date: "2025-12-31T00:00:00.000Z",
      created_at: "2020-01-01T00:00:00.000Z"
    });
  });
  

  it('should PUT a task successfully', async () => {
    const task = {
      title: 'changed name',
      description: 'changed desc',
      status: 'COMPLETED',
      due_date: new Date('2025-01-01'),
    }

    const res = await request(server).put('/api/tasks/999').send(task);

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      id: 999,
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date.toISOString(),
    });
  });

  it('should DELETE a task successfully', async () => {
    const res = await request(server).delete('/api/tasks/999');
    expect(res.statusCode).toBe(200);
  });
});
