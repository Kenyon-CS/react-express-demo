# React + Express Demo (COMP318) — Single Port (41xx)

A minimal full‑stack example for introducing **React fundamentals** and **frontend–backend integration**.

This project is intentionally small and readable so you can focus on the core ideas:

- **React components** are JavaScript functions that return UI (JSX)
- **Props** pass data from parent → child components
- **State** (`useState`) stores UI data that changes over time
- **Effects** (`useEffect`) fetch data from the backend API when the page loads
- **Events** (e.g., `onClick`, `onChange`) update state and trigger re-renders
- **Express** provides a JSON API (`/api/users`) that the React frontend calls with `fetch`

> Note: The backend uses an in‑memory array instead of a database to keep the demo focused.
> In later labs, you can replace the in-memory array with MariaDB queries.

---

## Why “Single Port” on a Shared Linux Host (10.192.145.170)

On a shared machine, **the frontend port is also a shared resource**.

- If everyone tries to run a separate frontend dev server on **3000**, only one person can use it.
- Same for a backend on **3001**.

To avoid that, this demo runs the **UI and API on one port** in the **41xx range**:

- UI: `http://10.192.145.170:41xx/`
- API: `http://10.192.145.170:41xx/api/users`

This mirrors real deployments:
- one server port exposed to the world
- static frontend served by the backend
- API mounted under `/api/...`

---

## Project Structure

```
react-express-demo-singleport/
├── server/
│   ├── package.json
│   └── index.js        # Express API + serves the React UI (static files)
└── client/
    ├── index.html
    └── src/
        ├── main.jsx
        └── App.jsx     # React components, props, state, events, fetch
```

---

## Prerequisites

- Node.js 18+ (Node 20+ recommended)
- npm (comes with Node)

Check:

```bash
node -v
npm -v
```

---

## How to Run (Recommended on the shared host)

### 1) Start the server on a unique port in the 41xx range

Pick a port assigned to you, e.g. **4123**:

```bash
cd server
npm install
PORT=4123 npm start
```

You should see output indicating the UI and API URLs.

### 2) Open the UI in your browser

Visit:

- `http://10.192.145.170:4123/`

The React frontend will call the API using a **relative URL** (`/api/users`),
so you do **not** need to edit client code to match ports.

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

Example POST (replace PORT):

```bash
curl -X POST http://10.192.145.170:4123/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Dana"}'
```

---

## Common Issues / Fixes

### Port already in use
Pick a different port in the 41xx range.

### Not reachable from your laptop
- Make sure you are on the right network/VPN
- Confirm your chosen port is allowed through the host firewall
- The server binds to `0.0.0.0` so it should be reachable if networking allows it

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
