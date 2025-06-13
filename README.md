
# 🚀 MERN Stack Web App (TypeScript + Vite)

This is a full-stack web application built using the MERN stack (MongoDB, Express.js, React, Node.js) with full TypeScript support. It features secure user authentication, a responsive UI, clean code architecture, and is ready for deployment using Vercel and Render.

---

## 🌐 Live Demo

- **Frontend**: https://your-frontend.vercel.app  
- **Backend**: https://your-backend.onrender.com

> Replace with actual links after deployment.

---

## 🛠️ Tech Stack

### 🌟 Frontend
- React (with Vite)
- TypeScript
- Tailwind CSS
- React Router DOM
- Axios

### 🧠 Backend
- Node.js
- Express.js
- TypeScript
- Mongoose (MongoDB)

### 🔐 Authentication
- JWT (JSON Web Token)
- bcrypt for password hashing
- dotenv for environment configuration
- CORS configuration

### ⚙️ Tooling & Deployment
- Git & GitHub
- Vercel (Frontend Deployment)
- Render (Backend Deployment)
- MongoDB Atlas (Cloud Database)

---

## 📁 Folder Structure

```
project-root/
├── client/              # Frontend (React + Vite)
│   ├── src/
│   └── vite.config.ts
├── server/              # Backend (Express + TypeScript)
│   ├── src/
│   └── tsconfig.json
├── .env                 # Environment variables (backend)
└── README.md
```

---

## 🚀 Deployment Guide

### 🟩 Backend (Render)

1. Go to https://render.com
2. Click "New Web Service" and connect your GitHub repo
3. Use the following settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `PORT=8080`
   - `MONGO_URI=your_mongo_connection_string`
   - `JWT_SECRET=your_secret_key`

---

### 🟦 Frontend (Vercel)

1. Go to https://vercel.com
2. Click "Add New Project" and import your GitHub repo
3. Set configuration:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   - `VITE_API_URL=https://your-backend.onrender.com`

---

## 🧪 Running Locally

### 🖥️ Backend

```bash
cd server
npm install
npm run dev
```

### 💻 Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

### `.env` file for Backend (`/server/.env`)
```env
PORT=8080
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```

### `.env` file for Frontend (`/client/.env`)
```env
VITE_API_URL=http://localhost:8080
```

---

## ✨ Features

- ✅ Secure authentication (register/login with JWT)
- ✅ Type-safe frontend and backend with TypeScript
- ✅ MongoDB-based data storage using Mongoose
- ✅ Responsive UI with Tailwind CSS
- ✅ Clean architecture and folder structure
- ✅ Deployment ready with Vercel + Render

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Express](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Render](https://render.com/)
- [Vercel](https://vercel.com/)
- [Tailwind CSS](https://tailwindcss.com/)
