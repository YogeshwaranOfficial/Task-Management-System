# 📋 Modern Task Management System

A production-ready full-stack task management application built with modern web technologies. This project demonstrates real-world software development practices including frontend-backend architecture, REST API development, database design, ORM integration, cloud deployment, and CI-ready project structuring.

The application allows users to manage tasks efficiently with features like task creation, updating, filtering, soft deletion, priority tracking, overdue detection, and responsive UI support.

---

## 🌐 Live Demo

### Frontend (Vercel)

[Live Application](https://task-management-system-by-yogeshwaran.vercel.app/)

### Backend API (Render)

[Backend API Base URL](https://task-management-system-backend-b2t3.onrender.com)

### API Endpoint Example

[Tasks API Endpoint](https://task-management-system-backend-b2t3.onrender.com/api/tasks)

---

# 🚀 Features

## ✅ Task Management

* Create tasks
* Edit existing tasks
* Delete tasks
* Soft delete & restore functionality
* Permanent delete support

## 📅 Due Date & Status Management

* Due date validation
* Overdue task detection
* Status tracking

## 🔍 Search & Filtering

* Search tasks instantly
* Filter by category
* Filter by priority
* Pagination support

## 🎨 Modern UI/UX

* Fully responsive design
* Dark mode support
* Toast notifications
* Clean dashboard layout

## ⚡ Backend Features

* RESTful API architecture
* Prisma ORM integration
* PostgreSQL relational database
* Type-safe backend using TypeScript
* Swagger API documentation

---

# 🛠️ Tech Stack

## Frontend

* React 19
* TypeScript
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* React Hot Toast
* Lucide React Icons

## Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* PostgreSQL
* Swagger UI / OpenAPI

## Database

* PostgreSQL
* Neon Cloud Database

## Deployment & Cloud

* Vercel (Frontend Hosting)
* Render (Backend Hosting)
* Neon (Cloud PostgreSQL)

## Developer Tools

* Git & GitHub
* npm
* Prisma Migrations
* REST API Testing
* Environment Variables
* TypeScript Compiler

---

# 🏗️ Architecture Overview

```text
Frontend (React + Vite)
        │
        │ Axios API Requests
        ▼
Backend (Node.js + Express)
        │
        │ Prisma ORM
        ▼
PostgreSQL Database (Neon)
```

---

# 📂 Project Structure

```text
Task-Management-System/
│
├── Backend/
│   ├── prisma/                 # Prisma schema & migrations
│   ├── src/
│   │   ├── routes/             # Express routes
│   │   ├── services/           # Business logic
│   │   ├── swagger/            # Swagger configuration
│   │   └── index.ts            # Entry point
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── context/            # React Context API
│   │   ├── pages/              # Application pages
│   │   ├── services/           # Axios API integration
│   │   └── App.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/YogeshwaranOfficial/Task-Management-System.git
```

---

# 🔧 Backend Setup

## Navigate to Backend

```bash
cd Backend
```

## Install Dependencies

```bash
npm install
```

## Setup Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_url
PORT=5000
```

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Database Migrations

```bash
npx prisma migrate dev
```

## Start Backend

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

# 🎨 Frontend Setup

## Navigate to Frontend

```bash
cd Frontend
```

## Install Dependencies

```bash
npm install
```

## Setup Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## Start Frontend

```bash
npm run dev
```

---

# ☁️ Deployment Workflow

## Frontend Deployment

* Hosted on Vercel
* Connected directly with GitHub repository
* Environment variables configured in Vercel dashboard

## Backend Deployment

* Hosted on Render Web Service
* Prisma migrations executed during deployment
* Production build generated automatically

## Database Deployment

* PostgreSQL database hosted on Neon
* Migrated local PostgreSQL data to Neon Cloud

---

# 📘 API Documentation

Swagger/OpenAPI documentation is available through the backend server.

Example:

```text
/api-docs
```

---

# 🧠 Concepts & Skills Demonstrated

This project demonstrates practical understanding of:

## Frontend Engineering

* Component-based architecture
* State management using Context API
* API integration using Axios
* Responsive UI design
* Dark mode implementation

## Backend Engineering

* REST API development
* Express middleware usage
* Service-layer architecture
* TypeScript backend development
* Error handling
* Request validation

## Database & ORM

* Relational database modeling
* Prisma schema design
* Database migrations
* CRUD operations
* Cloud database integration

## Deployment & DevOps

* GitHub repository management
* Environment variable management
* Vercel deployment
* Render deployment
* Neon PostgreSQL hosting
* Production build handling

## Real-World Problem Solving

* Prisma version compatibility debugging
* Build pipeline troubleshooting
* Render deployment debugging
* Backend path resolution fixes
* Database migration handling
* API routing corrections

---

# 🔮 Future Enhancements

Planned improvements for future versions:

* User Authentication (JWT)
* Role-Based Access Control
* Real-time notifications
* Task collaboration
* Drag & Drop Kanban Board
* File upload support
* Email reminders
* Activity logs
* Docker containerization
* CI/CD with GitHub Actions
* Unit & Integration Testing
* Redis caching
* WebSocket integration
* Advanced analytics dashboard

---

# 📸 Screenshots

*Add application screenshots here later.*

---

# 🤝 Contributing

Contributions, improvements, and suggestions are welcome.

```bash
Fork → Clone → Create Branch → Commit → Push → Pull Request
```

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

Developed by Yogeshwaran S

GitHub Repository:
[Task Management System Repository](https://github.com/YogeshwaranOfficial/Task-Management-System)
