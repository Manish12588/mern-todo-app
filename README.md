# MERN Todo App 📝

A full-stack Todo application built with the MERN stack — MongoDB, Express, React, Node.js — fully Dockerized.

## Stack

- **Frontend**: React 18 + served by Nginx
- **Backend**: Node.js + Express REST API
- **Database**: MongoDB 7 (persisted with Docker volume)
- **Reverse Proxy**: Nginx (port 80 → React + /api → Node)
- **Container**: Docker + Docker Compose

---

## Features

- ✅ Create todos with title and priority (low / medium / high)
- ✅ Toggle todo complete/incomplete
- ✅ Delete todos
- ✅ Filter by All / Active / Completed
- ✅ Priority color indicators
- ✅ Persisted in MongoDB

---

## Quick Start (Docker — recommended)

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd mern-todo

# 2. Build and start everything
docker compose up --build -d

# 3. Open browser
open http://localhost
```

### Stop
```bash
docker compose down          # stop containers
docker compose down -v       # stop + wipe MongoDB data
```

---

## Run Manually (without Docker)

### Prerequisites
- Node.js >= 18
- MongoDB running on localhost:27017

### 1. Start Backend
```bash
cd backend
npm install
MONGO_URI=mongodb://localhost:27017/mern-todo PORT=5000 node server.js
```

### 2. Start Frontend
```bash
cd frontend
npm install
npm start                    # runs on http://localhost:3000
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/health | Health check |
| GET | /api/todos | Get all todos |
| GET | /api/todos/:id | Get single todo |
| POST | /api/todos | Create todo |
| PUT | /api/todos/:id | Update todo |
| PATCH | /api/todos/:id/toggle | Toggle completed |
| DELETE | /api/todos/:id | Delete todo |

### POST /api/todos — Body
```json
{
  "title": "Buy groceries",
  "priority": "high"
}
```

`priority` values: `low` | `medium` | `high`

### PUT /api/todos/:id — Body
```json
{
  "title": "Updated title",
  "completed": true,
  "priority": "low"
}
```

---

## Project Structure

```
mern-todo/
├── backend/
│   ├── models/
│   │   └── Todo.js          # Mongoose schema
│   ├── routes/
│   │   └── todos.js         # Express routes
│   ├── server.js            # Entry point
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js           # Main React component
│   │   ├── App.css          # Styles
│   │   ├── index.js         # React entry point
│   │   └── index.css        # Global styles
│   ├── nginx.conf           # Nginx config
│   ├── package.json
│   └── Dockerfile           # Multi-stage build
├── docker-compose.yml
└── README.md
```

---

## Architecture

```
Browser
   │
   ▼
Nginx :80
   ├── /          → React static files
   └── /api/*     → http://backend:5000
                        │
                        ▼
                   Express API :5000
                        │
                        ▼
                   MongoDB :27017
```
