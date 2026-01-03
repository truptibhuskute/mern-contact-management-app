# Contact Management — Frontend

Simple React + Vite frontend for Contact Management demo.

Setup

1. Install dependencies

```powershell
cd "c:/Users/trupt/Desktop/Contact Management/frontend"
npm install
```

2. Start dev server

```powershell
npm run dev
```

By default the frontend expects the backend API at `http://localhost:5000/api`.
If your backend runs on a different origin, set the environment variable `VITE_API_BASE` before starting the dev server (example shown in PowerShell):

```powershell
$env:VITE_API_BASE = "http://your-backend:5000/api"; npm run dev
```
