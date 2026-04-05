#  Task Management System (Full-Stack)
A full-stack Task Management application that allows users to register, authenticate, and manage their personal tasks efficiently.
This project demonstrates secure authentication, scalable API design, and a clean SaaS-style frontend.
---
##  Features
###  Authentication
- User Registration & Login
- JWT-based authentication
- Access Token (short-lived)
- Refresh Token (auto-renew session)
- Secure password hashing using bcrypt
###  Task Management
- Create, Read, Update, Delete (CRUD) tasks
- Toggle task status (Completed / Pending)
- User specific tasks (multi-user support)
###  Advanced Functionalities
- Search tasks by title
- Filter tasks by status
- Pagination (server-side)
###  Frontend UX
- Clean SaaS-style dashboard
- Toast notifications (react-hot-toast)
- Loading states for better UX
- Disabled buttons during API calls
- Inline task editing
- Responsive layout
---
##  Tech Stack
### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL
- JWT (Authentication)
- bcrypt (Password hashing)
### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios (API calls)
- React Hot Toast
---
##  Project Structure
project-root/
├── backend/
├── client/
└── README.md
---
##  Setup & Run Instructions
### 1. Clone Repository
```bash
git clone <your-repo-link>
cd <project-folder>// Backend Setup

```
cd backend
npm install
```

Create `.env` file inside `backend/`

```
DATABASE_URL="mysql://root:password@localhost:3306/task_db"
JWT_SECRET=your_access_secret
REFRESH_SECRET=your_refresh_secret
PORT=3000
```

Run Database
Make sure MySQL is running locally, then:

```
npx prisma db push
```

Start Backend

```
npm run dev
```

Backend runs on:

```
http://localhost:3000
```

 Frontend Setup

```
cd Client/cd task-frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:3000
```

 Authentication Flow
1.  User logs in and receives: 
   *  Access Token (short-lived) 
   *  Refresh Token (long-lived) 
2.  Access token is used for API requests 
3.  When access token expires: 
   *  Axios interceptor calls `/auth/refresh` 
   *  New token is generated 
   *  Original request is retried automatically 
 API Endpoints
Auth
*  POST `/auth/register` 
*  POST `/auth/login` 
*  POST `/auth/refresh` 
*  POST `/auth/logout` 
Tasks
*  GET `/tasks` 
*  POST `/tasks` 
*  PATCH `/tasks/:id` 
*  DELETE `/tasks/:id` 
*  PATCH `/tasks/:id/toggle` 
 Key Concepts Used
*  RESTful API design 
*  JWT authentication & session handling 
*  Refresh token mechanism 
*  Axios interceptors for auto token refresh 
*  ORM-based database management (Prisma) 
*  Pagination, filtering & search (server-side) 
*  Component-based UI architecture (Next.js) 
 Notes
* `.env` file is not included for security reasons 
*  Use `.env.example` as reference
*  create local db task_db


====== Author ===============
     Ashish Yadav
