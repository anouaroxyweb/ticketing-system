# 🎫 Ticketing System

A modern and powerful **ticket management platform** built with **React + Node.js (Express) + PostgreSQL + Prisma + TailwindCSS**.  
It allows users to create support tickets, and gives support staff and admins tools to manage and track them efficiently.

---

## 🚀 Features

### 👤 Authentication & Roles
- Secure JWT Authentication (Register & Login)
- Three Roles:
  - **User** → Create and view their own tickets
  - **Support** → View and update ticket statuses
  - **Admin** → Full control (manage users and all tickets)

### 🧾 Tickets Management
- CRUD operations for tickets  
- Role-based visibility and permissions  
- Ticket status tracking (`open`, `in-progress`, `resolved`, `closed`)  
- Admin KPIs dashboard (Pie charts and insights)

### 💻 Frontend (React + TailwindCSS)
- Responsive and modern UI  
- Role-based dashboards  
- Axios for API communication  
- Zustand for state management  
- Chart visualizations with Recharts  

### 🧠 Backend (Node.js + Express + Prisma)
- RESTful API with structured routes
- Role-based Access Control middleware
- PostgreSQL database via Prisma ORM
- Input validation and error handling

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js, TailwindCSS, Zustand, Recharts |
| Backend | Node.js, Express.js, Prisma ORM |
| Database | PostgreSQL |
| Auth | JWT (JSON Web Token) |
| Dev Tools | TypeScript, Vite, ESLint, Docker (optional) |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/anouaroxyweb/ticketing-system.git
cd ticketing-system
<img width="1352" height="650" alt="login" src="https://github.com/user-attachments/assets/58a2b809-f1ea-46df-bcf0-5ed3adf5dceb" />
<img width="1346" height="645" alt="landing" src="https://github.com/user-attachments/assets/6fb6433a-3286-475a-a6b6-1b197c6d04bd" />
<img width="1350" height="641" alt="ticket" src="https://github.com/user-attachments/assets/65abdc03-e99a-4968-a20a-244799329d9a" />
