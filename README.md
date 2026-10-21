# 🧭 SahiChayan.Com (सही चयन) — AI Career Advisory & Roadmapping Web App

> **Academic Project**: Minor Project — Semester III  
> **Repository**: [https://github.com/Shrinivas-07/Minor-Project_SEM-III](https://github.com/Shrinivas-07/Minor-Project_SEM-III)  
> **Frontend Target**: Vercel  
> **Backend Target**: Render  
> **Database**: Supabase (PostgreSQL with Row Level Security)  
> **AI Engine**: Google Gemini 1.5 Flash  

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_1.5-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Render](https://img.shields.io/badge/Render-API_Cloud-46E3B7?style=for-the-badge&logo=render&logoColor=black)](https://render.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Frontend_Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## 📖 Executive Summary

**SahiChayan** (Hindi for *"The Right Choice"*) is an enterprise-grade AI-powered career counseling and roadmapping web application. It addresses the pervasive challenge of career uncertainty faced by school graduates, undergraduates, and transitioning professionals.

Unlike simplistic static questionnaires, SahiChayan integrates:
1. An **18-Trait Aptitude Matrix** evaluated across 4 cognitive domains.
2. A **Multi-Variable Weighted Matching Algorithm** that scores user vectors against verified industry benchmarks.
3. An **In-App Learning Center** featuring embedded YouTube video roadmaps, interactive milestone checklists, and career dossiers without disruptive external redirects.
4. A **Gemini-Powered AI Career Mentor** offering context-aware advice on degrees, skills, entrance exams, and realistic salary growth.
5. **Supabase PostgreSQL Data Persistence** with Row-Level Security (RLS) for user accounts, saved bookmarks, and assessment records.

---

## 🏗️ System Architecture

```
                                  ┌─────────────────────────────┐
                                  │      User Web Browser       │
                                  └──────────────┬──────────────┘
                                                 │
                                                 ▼
                                  ┌─────────────────────────────┐
                                  │     Vercel Edge Network     │
                                  │   (Vite + React SPA Client) │
                                  └──────────────┬──────────────┘
                                                 │
                                   HTTP REST / JSON / JWT
                                                 │
                                                 ▼
                                  ┌─────────────────────────────┐
                                  │      Render Cloud Web       │
                                  │    (Node.js / Express API)  │
                                  └───────┬──────────────┬──────┘
                                          │              │
                    SQL Queries / RLS Auth│              │Contextual Prompts
                                          ▼              ▼
                              ┌──────────────────┐ ┌────────────────┐
                              │  Supabase Cloud  │ │  Google Gemini │
                              │   (PostgreSQL)   │ │  AI 1.5 Flash  │
                              └──────────────────┘ └────────────────┘
```

---

## 📁 Repository Structure

```
SahiChayan.Com/
├── client/                          # React + Vite Frontend
│   ├── public/                      # Static assets & icons
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/              # Navbar, Footer, Badges
│   │   │   └── inApp/               # VideoModal, RoadmapModal, AiMentorDrawer
│   │   ├── context/                 # AuthContext (Supabase), AssessmentContext
│   │   ├── data/                    # 30+ Careers, 18 Traits, Resources Data
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx      # High-conversion modern landing page
│   │   │   ├── AssessmentPage.jsx   # 18-trait slider engine & top-10 results
│   │   │   ├── CareersPage.jsx      # Directory with search & side-by-side compare
│   │   │   ├── CareerDetailPage.jsx # In-app career dossier & checklist
│   │   │   ├── ResourcesPage.jsx    # Curated video masterclasses & roadmaps
│   │   │   ├── MentorPage.jsx       # Dedicated AI Career Counselor full-page
│   │   │   ├── DashboardPage.jsx    # User profile & saved bookmarks
│   │   │   ├── LoginPage.jsx        # Auth with 1-Click Demo login
│   │   │   └── RegisterPage.jsx     # User registration
│   │   ├── services/                # Supabase client & API services
│   │   ├── App.jsx                  # Main router & layout shell
│   │   ├── index.css                # Tailwind directives & aesthetic light styles
│   │   └── main.jsx                 # Entry point
│   ├── index.html                   # HTML template with Google Fonts
│   ├── tailwind.config.js           # Design tokens, brand colors, soft shadows
│   ├── vite.config.js               # Dev server & proxy settings
│   ├── vercel.json                  # Vercel SPA rewrites configuration
│   └── package.json
│
├── server/                          # Production Node.js / Express Backend
│   ├── src/
│   │   ├── config/                  # Supabase & Gemini AI initializers
│   │   ├── controllers/             # AI mentor, Careers, Assessment, Resources
│   │   ├── routes/                  # Express REST route handlers
│   │   ├── data/                    # Master career database
│   │   └── app.js                   # Express app with CORS & health check
│   ├── server.js                    # HTTP server entry point with graceful shutdown
│   ├── render.yaml                  # Render cloud deployment blueprint
│   ├── .env.example                 # Backend environment variable template
│   └── package.json
│
├── database/
│   ├── supabase_schema.sql          # 1-Click Supabase PostgreSQL Schema with RLS
│   └── seed_data.sql                # Pre-populated careers & resource catalog
│
├── .gitignore                       # Clean enterprise gitignore
├── package.json                     # Monorepo root scripts
└── README.md                        # Documentation
```

---

## ⚡ Quick Start (Local Development)

### 1. Prerequisites
* **Node.js** v18+ (tested on Node v24)
* **npm** v10+

### 2. Install All Dependencies
From the repository root:
```bash
# Install backend dependencies
cd server && npm install

# Install frontend dependencies
cd ../client && npm install
```

### 3. Configure Environment Variables

#### Backend (`server/.env`)
Create a `.env` file in the `server/` directory:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Free Gemini API Key from https://aistudio.google.com/apikey
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Credentials from https://supabase.com/dashboard/project/_/settings/api
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_or_anon_key
```

#### Frontend (`client/.env`)
Create a `.env` file in the `client/` directory:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
VITE_API_BASE_URL=http://localhost:5000
```

> **Note**: Both frontend and backend include safe fallbacks. If Supabase or Gemini keys are omitted during local review, the app runs smoothly in offline/demo mode!

### 4. Run Locally
Open two terminal tabs:

**Terminal 1 (Backend API)**:
```bash
cd server
npm run dev
# Running on http://localhost:5000
# Health check: http://localhost:5000/api/health
```

**Terminal 2 (Frontend Client)**:
```bash
cd client
npm run dev
# Running on http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser.

---

## 🗄️ Supabase Database Setup

1. Create a free account and project at [Supabase](https://supabase.com).
2. Open your project's **SQL Editor** (`https://supabase.com/dashboard/project/_/sql`).
3. Copy the entire contents of [**`database/supabase_schema.sql`**](database/supabase_schema.sql) and click **Run**.
4. (Optional) Run [**`database/seed_data.sql`**](database/seed_data.sql) to preload the database with sample career catalog records.
5. Retrieve your project credentials from **Project Settings > API**:
   - `Project URL` → `SUPABASE_URL` / `VITE_SUPABASE_URL`
   - `anon public` → `VITE_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

---

## 🚀 Cloud Deployment Instructions

### Deploying Backend to Render
1. Push your code to your GitHub repository: `https://github.com/Shrinivas-07/Minor-Project_SEM-III`.
2. Go to [Render Dashboard](https://dashboard.render.com/) → **New Web Service**.
3. Connect your repository.
4. Settings:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `CLIENT_URL` = Your Vercel frontend URL (e.g. `https://sahichayan.vercel.app`)
   - `GEMINI_API_KEY` = Your Google AI Studio API key
   - `SUPABASE_URL` = Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY` = Your Supabase service role key
6. Click **Deploy Web Service**. Your API will be live at `https://your-service.onrender.com`.

### Deploying Frontend to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → **Add New Project**.
2. Import your GitHub repository: `Shrinivas-07/Minor-Project_SEM-III`.
3. Configure project settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click Edit and select `client`
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = Your Supabase anon public key
   - `VITE_API_BASE_URL` = Your Render backend URL (e.g. `https://your-service.onrender.com`)
5. Click **Deploy**. Vercel will build and publish your web app globally!

---

## 🔗 Pushing to Your New GitHub Repository

To push this project to your new repository:

```bash
# 1. Verify you are on main branch
git branch -M main

# 2. Update remote URL to your new repository
git remote set-url origin https://github.com/Shrinivas-07/Minor-Project_SEM-III.git

# 3. Stage clean restructured files
git add .

# 4. Commit changes
git commit -m "feat: complete SahiChayan 2.0 re-architecture with Supabase, clean UI/UX, and cloud deployment"

# 5. Push to GitHub
git push -u origin main --force
```

---

## 🎓 Academic Minor Project Details
* **Project Title**: SahiChayan (सही चयन) — AI-Driven Career Counseling & Milestone Roadmapping Platform
* **Academic Semester**: Semester III
* **Student Author**: Shrinivas
* **Technologies Used**: React 18, Vite, Tailwind CSS, Supabase (PostgreSQL), Google Gemini AI, Node.js, Express.js.

