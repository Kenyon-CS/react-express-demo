# React + Express Demo (COMP318) — Build + Single Port (41xx)

You’re right to insist on a **build step**. Browsers cannot run `.jsx` directly.
This version uses **Vite** to compile React/JSX into normal JavaScript in `client/dist/`,
and then **Express serves the built frontend + the API on one port** in the **41xx range**.

## What this demonstrates
- Components as functions returning JSX
- Props (parent → child)
- State (`useState`)
- Effects (`useEffect`) for fetching data
- Events (`onChange`, `onClick`)
- Frontend ↔ backend integration via JSON API (`/api/users`)

## Why single-port matters on 10.192.145.170
On a shared host, `3000` conflicts. Here the **UI and API share the same 41xx port**:
- UI:  `http://10.192.145.170:41xx/`
- API: `http://10.192.145.170:41xx/api/users`

The React app calls the API using **relative URLs** (`/api/users`), so there is **no hard-coded localhost**.

---

## Setup & Run (recommended commands)

From the project root:

### 1) Install dependencies (one time)
```bash
npm run install-all
```

### 2) Build the React client
```bash
npm run build
```

### 3) Start the Express server on your assigned port
```bash
PORT=4123 npm run start
```

Now open:
- `http://10.192.145.170:4123/`

---

## Alternative (explicit commands)
If you don’t want the root scripts:

```bash
cd client
npm install
npm run build

cd ../server
npm install
PORT=4123 npm start
```

---

## Test the API
```bash
curl http://10.192.145.170:4123/api/users
```

Add a user:
```bash
curl -X POST http://10.192.145.170:4123/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Dana"}'
```

---

## Common failure modes

**“ERROR: client/dist/index.html not found”**
- You forgot to run the client build step (`npm run build`).

**Blank page / 404 at /**  
- You started the server from some other folder or copied only the `server/` directory.
  The server expects `../client/dist` relative to `server/index.js`.

---

**COMP318 Software Development**
