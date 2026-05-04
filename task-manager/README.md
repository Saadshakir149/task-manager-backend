# Task Manager (MERN)

A full-stack task management system with JWT auth, task CRUD, filters, search, stats, and deployment-ready setup.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB (Local or Atlas)
- Auth: JWT + bcrypt

## Project Structure
- `backend/`: API, authentication, data models
- `frontend/`: React app with task dashboard

## Features
- Register/Login/Logout
- Protected routes
- Create, read, update, delete tasks
- Mark tasks complete/incomplete
- Filter by status and priority
- Search by title
- Task stats (total/completed/pending)
- Responsive UI and toast notifications

## Local Setup

### 1) Backend
```bash
cd backend
npm install
cp .env.example .env # optional if you create one
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/taskmanager
# or Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Auth (`/api/auth`)
- `POST /register`
- `POST /login`
- `GET /me`

### Tasks (`/api/tasks`)
- `GET /`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

## Deploy Backend to Render
1. Push repo to GitHub
2. Create Web Service in Render
3. Root directory: `backend`
4. Use `render.yaml` or configure:
   - Build command: `npm install`
   - Start command: `node server.js`
5. Set env vars:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`

## Deploy Frontend to Vercel
1. Import project in Vercel
2. Root directory: `frontend`
3. Add env var:
   - `VITE_API_URL=https://your-backend.onrender.com/api`
4. Deploy

## Connect Frontend and Backend
- Ensure frontend `VITE_API_URL` points to deployed backend `/api` URL.

## Optional One-Click Script
Run from project root:
```bash
bash deploy.sh
```

## Production Notes
- Use strong `JWT_SECRET`
- Restrict CORS to your frontend domain in production
- Add request rate limiting and logging for hardened production use
