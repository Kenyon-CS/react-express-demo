# React + Express Demo (COMP318)

A minimal full‑stack example for introducing **React fundamentals** and **frontend–backend integration**.

This project is intentionally small and readable so you can focus on the core ideas:

- **React components** are JavaScript functions that return UI (JSX)
- **Props** pass data from parent → child components
- **State** (`useState`) stores UI data that changes over time
- **Effects** (`useEffect`) fetch data from a backend API when the page loads
- **Events** (e.g., `onClick`, `onChange`) update state and trigger re-renders
- **Express** provides a JSON API (`/api/users`) that the React frontend calls with `fetch`

> Note: The backend uses an in‑memory array instead of a database to keep the demo focused.
> In later labs, you can replace the in-memory array with MariaDB queries.

---

## Project Structure

```
react-express-demo/
├── server/
│   ├── package.json
│   └── index.js        # Express API (GET/POST /api/users)
└── client/
    ├── index.html
    ├── package.json
    └── src/
        ├── main.jsx
        └── App.jsx     # React components, props, state, events, fetch
```

---

## Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm (comes with Node)

Check versions:

```bash
node -v
npm -v
```

---

## How to Run

You will run **two processes** in two terminals:

- **Terminal 1:** Express backend API (port **3001**)
- **Terminal 2:** React frontend (served on port **3000**)

### 1) Start the backend (Express)

```bash
cd server
npm install
npm start
```

You should see something like:

```
API running on http://localhost:3001
```

Test it with curl:

```bash
curl http://localhost:3001/api/users
```

---

### 2) Start the frontend (React)

Open a second terminal:

```bash
cd client
npm start
```

This uses `npx serve` to host the frontend. Open:

- http://localhost:3000

---

## What to Try

### Add a user
1. Type a name in the input box
2. Click **Add User**
3. The UI updates immediately (React state changes → re-render)
4. The new user is also stored on the backend (in memory)

### Refresh the page
Refreshing triggers the frontend to fetch `/api/users` again and rebuild its UI from the returned JSON.

---

## Backend API

The Express server implements:

### GET `/api/users`
Returns all users as JSON.

### POST `/api/users`
Adds a user and returns the new user object.

Example POST:

```bash
curl -X POST http://localhost:3001/api/users   -H "Content-Type: application/json"   -d '{"name":"Dana"}'
```

---

## Common Issues / Fixes

### “CORS” errors
This demo enables CORS in the server using the `cors` package. If you remove it,
the browser may block requests to port 3001.

### Port already in use
If 3000 or 3001 are taken, stop the other process or change the ports in:
- `server/index.js` (PORT)
- `client/src/App.jsx` (fetch URL)

---

## Next Steps (Optional Extensions for COMP318)

- Replace the in‑memory `users` array with MariaDB:
  - `GET /api/users` → `SELECT ...`
  - `POST /api/users` → `INSERT ...`
- Add DELETE `/api/users/:id`
- Add loading + error states in React
- Introduce React Router for multiple pages

---

**COMP318 Software Development**
