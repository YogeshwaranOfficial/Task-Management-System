Task Management System

A modern full-stack task management application built using React, TypeScript, Node.js, Express, Prisma, and PostgreSQL.

Features
Create tasks
Edit tasks
Soft delete tasks
Restore deleted tasks
Permanent delete
Due date tracking
Overdue task detection
Task priorities
Category filtering
Search tasks
Pagination
Dark mode
Notifications system
Responsive UI
Context API state management
Prisma ORM integration
REST API backend
Tech Stack
Frontend
React 19
TypeScript
Vite
Tailwind CSS
React Router DOM
Axios
React Hot Toast
Lucide React Icons
Backend
Node.js
Express.js
TypeScript
Prisma ORM
PostgreSQL
Swagger API Docs
Project Structure
Task-Management-System/
│
├── Backend/
│   ├── prisma/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
Installation
Clone Repository
git clone <your-github-repo-url>
cd Task-Management-System
Backend Setup
Navigate
cd Backend
Install Dependencies
npm install
Create .env
DATABASE_URL="your_postgresql_database_url"
PORT=5000
Run Prisma Migration
npx prisma migrate dev
Start Backend Server
npm run dev

Backend runs on:

http://localhost:5000
Frontend Setup
Navigate
cd Frontend
Install Dependencies
npm install
Start Frontend
npm run dev

Frontend runs on:

http://localhost:5173
API Documentation

Swagger API docs:

http://localhost:5000/api-docs
Database

This project uses:

PostgreSQL
Prisma ORM
Deployment Suggestions
Frontend

You can deploy frontend using:

Vercel
Netlify
Cloudflare Pages
Backend

You can deploy backend using:

Render
Railway
Fly.io
VPS + Docker
Database

Recommended PostgreSQL providers:

Neon
Supabase
Railway PostgreSQL
Future Improvements
Authentication
JWT Authorization
User accounts
Task sharing
Drag and drop tasks
Real-time updates
WebSockets
Docker support
CI/CD pipelines
Unit testing
E2E testing