# ✦ Aela Frontend

> AI-powered luxury travel planning — React + Vite + TypeScript frontend.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
```
Edit `.env` and fill in:
- `VITE_CLERK_PUBLISHABLE_KEY` — from [dashboard.clerk.com](https://dashboard.clerk.com) → API Keys
- `VITE_API_URL` — your backend URL (default: `http://localhost:3000`)

### 3. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

> **Note**: Your backend must be running at `VITE_API_URL` for chat to work.

## Build for Production
```bash
npm run build
```

## Project Structure
```
src/
├── api/         # Typed fetch wrapper for POST /chat
├── components/  # Reusable UI components
├── pages/       # LandingPage, ChatPage
└── index.css    # Design system & global styles
```

## Tech Stack
- **React 18** + **TypeScript**
- **Vite** — build tool
- **Clerk** — authentication
- **React Router** — routing
- **Vanilla CSS** — custom design system

---

*Backend repo is separate — this repo contains frontend only.*
