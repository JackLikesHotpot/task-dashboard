# Task Dashboard

A simple fullstack web app which allows a user to create and view tasks, make changes to tasks and delete them.

## Stack:

### Frontend:
- React
- TypeScript
- Tailwind
- Cypress (for E2E testing)

### Backend:
- Node.JS (Express, Prisma)
- Jest/Supertest (for unit testing)

# Requirements

- npm v10 or higher
- Node.js v20 or higher

## Backend Setup

1. **Open a terminal and navigate to the backend folder:**
```bash
cd backend
npm install
```

2. **Create a `.env` file in the `backend` folder containing these contents:
```bash
DATABASE_URL="file:./dev.db"
```

3. **Apply database migrations and generate the Prisma client:**
```bash
npx prisma migrate deploy
npx prisma generate
```

4. **Start the backend server:**
```bash
npm run server
```

## Frontend Setup

1. **Open another terminal and navigate to the `frontend` folder:**
```bash
cd frontend
npm install
```

2. **Start the frontend development server with:**
```bash
npm run dev
```

---

# API Endpoints

## GET `/tasks`
Returns a list of tasks.

**Example Request:**
`GET /api/tasks`

**Response:**
```json
{
  "message": "Successfully retrieved tasks.",
  "data": [
    {
    "id": 1,
    "title": "Task 1",
    "description": "First task description",
    "status": "TO_DO",
    "due_date": "2025-04-22T10:00:00Z",
    "created_at": "2025-04-20T10:00:00Z",
    "updated_at": "2025-04-20T12:00:00Z"
    },
    {
    "id": 2,
    "title": "Task 2",
    "description": "Second task description",
    "status": "COMPLETED",
    "due_date": "2025-04-21T15:00:00Z",
    "created_at": "2025-04-20T11:00:00Z",
    "updated_at": "2025-04-21T16:00:00Z"
    }
  ]
}
```

**Error Responses**
- Status Code: 400
- Content:
```json
{
  "error": "Error getting tasks"
}
```

## GET `/tasks/:id`
Returns a specific task with that ID.

**Example Request:**
`GET /api/tasks/1`

**Response:**
```json
{
  "message": "Successfully retrieved tasks of id 1.",
  "data": [
  {
    "id": 1,
    "title": "Task 1",
    "description": "First task description",
    "status": "TO_DO",
    "due_date": "2025-04-22T10:00:00Z",
    "created_at": "2025-04-20T10:00:00Z",
    "updated_at": "2025-04-20T12:00:00Z"
    }
  ]
}
```

**Error Responses**
- Status Code: 500
- Content:
```json
{
  "error": "Error viewing task of id 1"
}
```

- Status Code: 404
- Content:
```json
{
  "error": "Task with id 1 does not exist"
}
```

## POST `/create`
Creates a task by passing in parameters for title, description, status and due_date. 

**Example Request:**
`POST /api/tasks/create?title=Task&description=description&status=TO_DO&due_date=2025-05-02`

**Response:**
```json
{
  "message": "Successfully created task.",
  "data": {
    "created_at": "2025-04-23T00:00:00.000Z",
    "description": "description",     
    "due_date": "2025-05-02T00:00:00.000Z",
    "id": 1,     
    "status": "TO_DO",
    "title": "Task",      
    "updated_at": "2025-04-23T00:00:00.000Z"
  }
}
```

**Error Responses**
- Status Code: 400
- Content:
```json
{
  "error": "Error creating task"
}
```

## PUT `/tasks/:id`
Edits a specific ID by passing in parameters for title, description, status and due_date. 

**Example Request:**
`PUT /api/tasks/1?title=New%20task%name`

**Response:**
```json
{
  "message": "Task of ID 1 updated successfully.",
  "data": {
  "created_at": "2025-04-23T00:00:00.000Z",
  "description": "description",     
  "due_date": "2025-05-02T00:00:00.000Z",
  "id": 1,     
  "status": "TO_DO",
  "title": "New task name",      
  "updated_at": "2025-04-23T00:00:00.000Z"
  }
}
```

**Error Responses**
- Status Code: 400
- Content:
```json
{
  "error": "Error updating task of id 1"
}
```

## DELETE `/tasks/:id`
Deletes a task with that specific ID.

**Example Request:**
`DELETE /api/tasks/1`

**Response**

```json
{
    "message": "Task deleted succesfully."
}
```

**Error Responses**
- Status Code: 400
- Content:
```json
{
  "error": "Failed to delete tasks with ID 1"
}
```