import express from 'express'
import taskRoutes from './routes/taskRoutes'
import dotenv from 'dotenv'
import cors from 'cors'

const server = express()

server.use(cors({
  origin: 'http://localhost:5173'
}))

server.use(express.json())

dotenv.config();

server.use('/api', taskRoutes)

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});