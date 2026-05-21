# 📋 Modern Task Management System

A production-ready, full-stack task management application featuring real-time state tracking, a responsive user interface, and robust data persistence. Built using **React 19**, **TypeScript**, **Node.js**, **Prisma ORM**, and **PostgreSQL**.

---

## ✨ Features

*   **Comprehensive Task Lifecycle:** Create, edit, and track tasks easily. Includes **Soft Delete** with a restoration option and **Permanent Delete** safety measures.
*   **Time & Priority Tracking:** Due date assignment with built-in **overdue task detection** and priority level categorization.
*   **Advanced Discovery:** Instant search capabilities combined with flexible category filtering and server-side pagination.
*   **User Experience:** Native **Dark Mode** support, real-time toast notifications, and a fully fluid, responsive layout.
*   **Architecture:** Clean state management via the React Context API, structured REST endpoints, and automated database interactions using Prisma.

---

## 🛠️ Tech Stack

### Frontend
*   **Core:** React 19, TypeScript, Vite
*   **Styling:** Tailwind CSS, Lucide React (Icons)
*   **Routing & Network:** React Router DOM, Axios
*   **Feedback:** React Hot Toast

### Backend
*   **Core:** Node.js, Express.js, TypeScript
*   **Database & ORM:** PostgreSQL, Prisma ORM
*   **Documentation:** Swagger UI (OpenAPI)

---

## 📂 Project Structure

```text
Task-Management-System/
│
├── Backend/
│   ├── prisma/           # Database schema & migrations
│   ├── src/              # Express source code (TypeScript)
│   ├── package.json
│   └── tsconfig.json
│
├── Frontend/
│   ├── src/              # React components, hooks, & context
│   ├── public/           # Static assets
│   ├── package.json
│   └── vite.config.ts
│
├── .gitignore
└── README.md