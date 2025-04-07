import express from 'express'
import taskRoutes from './routes/taskRoutes'
import dotenv from 'dotenv'

const server = express()

server.use(express.json())

dotenv.config();

server.use('/api', taskRoutes)

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});