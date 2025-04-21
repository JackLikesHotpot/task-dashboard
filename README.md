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
### Returns a list of tasks.


## GET `/tasks/:id`
### Returns a specific task with that ID.


## POST `/create`
### Creates a task by passing in parameters for title, description, status and due_date. 


## PUT `/tasks/:id`
### Edits a specific ID by passing in parameters for title, description, status and due_date. 


## DELETE `/tasks/:id`
### Deletes a task with that specific ID.