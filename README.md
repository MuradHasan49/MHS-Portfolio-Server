# 🚀 MHS Portfolio & Dynamic CMS

An ultra-modern, production-grade **Full-Stack Portfolio & Content Management System (CMS)** built for **Murad Hasan** (MERN Stack Developer). Featuring interactive WebGL 3D graphics, smooth Framer Motion animations, dark/light theme toggle, and a fully featured administrative dashboard for dynamic content administration.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs)
![Express.js](https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Better Auth](https://img.shields.io/badge/Auth-Better--Auth-blue?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Frontend Portfolio](#-frontend-portfolio)
  - [Administrative CMS](#-administrative-cms)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#1-backend-setup)
  - [Frontend Setup](#2-frontend-setup)
  - [Database Seeding & Admin User](#3-database-seeding--admin-creation)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Deployment Guide](#-deployment-guide)
- [Author & Contact](#-author--contact)

---

## 🌐 Overview

This application serves as both a high-impact personal developer showcase and an enterprise-style CMS. It allows seamless real-time management of portfolio content—including projects, tech stack skills, academic credentials, work experience timelines, personal settings, and incoming client messages—without needing code redeployments.

---

## ✨ Key Features

### 🎨 Frontend Portfolio
* **3D Visual Canvas Effects:** Powered by `OGL` (WebGL library) rendering an interactive floating 3D particle background.
* **Modern UI & Responsive Design:** Glassmorphic card design, fluid typography (Inter font), tailored dark and light mode themes via `next-themes`.
* **Framer Motion Micro-Animations:** Page transitions, scroll-triggered fade-ins, and hover micro-interactions.
* **Global Search Command Palette:** Instant site-wide search dialog (`Cmd/Ctrl + K`) for finding projects, skills, and site sections.
* **Dynamic Content Hydration:** Real-time data fetching using SWR (Stale-While-Revalidate) with fallbacks.
* **Interactive Contact Form:** Captures client messages directly into MongoDB and dispatches instant email notifications to the owner via Nodemailer.
* **SEO Optimized:** Metadata, OpenGraph cards, Twitter preview tags, dynamic `sitemap.js`, and semantic HTML5 hierarchy.

### 🛡️ Administrative CMS (`/admin`)
* **Secure Authentication:** Protected admin panel powered by **Better Auth** session management and encrypted credentials.
* **Dashboard Analytics:** Live statistics overview displaying counts for total projects, skills, certificates, and unread contact messages.
* **Project Management:** Full CRUD operations with live preview links, repository links, dynamic technology tags, and featured status toggles.
* **Skill Category Management:** Group and update tech stack skills (Frontend, Backend, Database, Tools) with proficiency ratings and custom icons.
* **Experience & Education Timelines:** Manage career history, job responsibilities, degrees, and institutions.
* **Settings Control:** Edit hero titles, bio descriptions, social media profile links (GitHub, LinkedIn, Facebook), profile avatar, and resume file link.
* **Cloud Image Uploads:** Integrated image upload pipeline using Multer and ImgBB API.
* **Message Inbox:** Interface to review, manage, and remove client inquiries.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 14 (App Router) | Server-Side Rendering & Client Components |
| **UI Library** | React 18 | Component-driven UI development |
| **Styling & Icons** | Tailwind CSS & Lucide Icons | Utility-first styling & crisp icons |
| **3D & Animations** | OGL & Framer Motion | WebGL background particle graphics & fluid motion |
| **State & Fetching** | SWR | Fast data fetching and cache revalidation |
| **Backend Runtime** | Node.js | Asynchronous JavaScript runtime |
| **Web Server** | Express.js 5 | Lightweight REST API routing middleware |
| **Database** | MongoDB & Mongoose ORM | NoSQL database hosting dynamic content |
| **Authentication** | Better Auth | Robust session & credential management |
| **Image Hosting** | ImgBB API via Multer | Direct cloud image uploading service |
| **Mailing Service** | Nodemailer | Gmail SMTP transactional email dispatch |

---

## 📁 Project Structure

```
mhs_portfolio/
├── backend/
│   ├── src/
│   │   ├── config/          # DB connection & Better-Auth configuration
│   │   ├── models/          # Mongoose Schemas (Project, Skill, Experience, Education, Message, Settings)
│   │   ├── routes/          # Express API Endpoints (projects, skills, auth, upload, contact, etc.)
│   │   └── index.js         # Backend Express Application entry point
│   ├── create-admin.js      # Administrative user provisioning script
│   ├── seedProjects.js      # Seed dataset for projects
│   ├── seedSkills.js        # Seed dataset for technical skills
│   ├── seedExperience.js    # Seed dataset for work experience
│   ├── seedEducation.js     # Seed dataset for academic history
│   ├── seedSettings.js      # Seed dataset for profile & social links
│   ├── vercel.json          # Deployment config for Vercel serverless backend
│   └── package.json
│
└── client/
    ├── src/
    │   ├── app/             # Next.js 14 App Router Pages (/admin, /projects, /skills, etc.)
    │   ├── components/      # Reusable UI Components (Navbar, Footer, 3D Background, SearchDialog)
    │   │   └── admin/       # Admin modal forms & management controls
    │   ├── config/          # Fallback configuration & static data
    │   ├── lib/             # Better Auth client instance (`auth-client.js`)
    │   └── pages/           # View renderers (Home, About, Contact, Projects, Skills)
    ├── public/              # Static assets, PDFs, and icons
    ├── next.config.js       # Next.js optimization configuration
    ├── tailwind.config.js   # Tailwind custom styling configuration
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database connection string
- [ImgBB API Key](https://api.imgbb.com/) (for image uploads)

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment configuration file
cp .env.example .env  # Or create a .env file manually
```

Configure your `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio
BETTER_AUTH_SECRET=your_super_secret_auth_key
BETTER_AUTH_URL=http://localhost:5000
IMGBB_API_KEY=your_imgbb_api_key
EMAIL_USER=your_gmail_address@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_RECEIVER=your_recipient_email@gmail.com
NODE_ENV=development
```

Start the backend development server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

---

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to client directory
cd client

# Install dependencies
npm install
```

Create a `.env.local` file inside the `client` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```
The application will run on `http://localhost:3000`.

---

### 3. Database Seeding & Admin Creation

To quickly populate your database with initial data and set up an administrator account:

```bash
# Inside the backend directory:

# Create default Admin Account
node create-admin.js

# Seed all database collections
node seedSettings.js
node seedProjects.js
node seedSkills.js
node seedExperience.js
node seedEducation.js
```

Default Admin Credentials generated by script:
- **Email:** `mhs@admin.com`
- **Password:** `MURAD#SHUVO` *(Note: Change password after first sign in for security)*

---

## 🔌 API Reference

### Public & Admin Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | API Health Check | Public |
| `POST` | `/api/auth/*` | Better Auth Authentication Handlers | Public/Admin |
| `GET` | `/api/projects` | Fetch all portfolio projects | Public |
| `POST` | `/api/projects` | Create a new project | Admin |
| `PUT` | `/api/projects/:id` | Update project details | Admin |
| `DELETE`| `/api/projects/:id` | Delete a project | Admin |
| `GET` | `/api/skills` | Fetch skill categories & items | Public |
| `POST` | `/api/skills` | Add/Update skill entry | Admin |
| `GET` | `/api/experience` | Fetch career experience timeline | Public |
| `GET` | `/api/education` | Fetch academic history timeline | Public |
| `GET` | `/api/settings` | Fetch hero, bio, & social media links | Public |
| `PUT` | `/api/settings` | Update site setting configurations | Admin |
| `POST` | `/api/contact` | Submit contact form & trigger Nodemailer | Public |
| `GET` | `/api/contact/messages`| View inbox messages | Admin |
| `DELETE`| `/api/contact/messages/:id`| Remove message from inbox | Admin |
| `POST` | `/api/upload` | Upload image buffer to ImgBB cloud | Admin |

---

## 📦 Deployment Guide

### Deploying Backend on Vercel
1. Set up a project on Vercel connected to the `backend` directory.
2. Add environment variables (`MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `IMGBB_API_KEY`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_RECEIVER`) in Vercel settings.
3. The included `vercel.json` routes all requests to `src/index.js`.

### Deploying Frontend on Vercel
1. Connect the `client` directory to Vercel as a Next.js project.
2. Add environment variable `NEXT_PUBLIC_API_URL` pointing to your deployed backend domain (e.g., `https://your-backend.vercel.app`).
3. Deploy!

---

## 👤 Author & Contact

**Murad Hasan**  
*MERN Stack Developer & Full-Stack Engineer*

- **Website:** [muradhasan49.vercel.app](https://muradhasan49.vercel.app)
- **GitHub:** [@MuradHasan49](https://github.com/MuradHasan49)
- **LinkedIn:** [in/muradhasan49](https://www.linkedin.com/in/muradhasan49)
- **Email:** [muradhassan649@gmail.com](mailto:muradhassan649@gmail.com)

---

<p center align="center">
  Crafted with ❤️ by Murad Hasan
</p>
