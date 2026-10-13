# NextGen AI Agent

> An intelligent AI assistant that can understand documents, retrieve knowledge, use tools, remember context, and perform controlled tasks.

**Status: Phase 1 of 15 - Project Foundation**

This repository is being built incrementally, one phase at a time. Each phase is small, testable on its own, and builds on the previous phase. See the project brief for the full 15-phase plan.

## Project structure

```text
nextgen-ai-agent/
  client/     React + Vite + Tailwind frontend
  server/     Node.js + Express + MongoDB backend
  docs/       Architecture, API, and security documentation
```

## Phase 1: Project foundation

- Express backend with a `GET /api/health` endpoint
- MongoDB connection using Mongoose
- Centralized environment configuration, error handling, and 404 handling
- React + Vite + Tailwind frontend that calls `/api/health` on load to verify the frontend-to-backend connection

Authentication, chat, and AI features will be added in later phases.

## Quick start

### Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Edit `server/.env` and set `MONGO_URI` for your MongoDB instance before starting the backend.

### Frontend

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

Open <http://localhost:5173>. When the backend and MongoDB are configured and running, the page should show a green "Server is running" status card.
