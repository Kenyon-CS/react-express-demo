import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors()); // ok for a demo; in production you'd scope this down
app.use(express.json());

// -------- In-memory data (stands in for a database) --------
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

// -------- API routes (Express → JSON) --------
app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const name = (req.body?.name || "").trim();
  if (!name) return res.status(400).json({ error: "name is required" });

  const user = { id: Date.now(), name };
  users.push(user);
  res.json(user);
});

// -------- Serve the frontend from the same server/port --------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from ../client
const clientDir = path.resolve(__dirname, "../client");
app.use(express.static(clientDir));

// SPA fallback: any non-API route returns index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientDir, "index.html"));
});

// ✅ Single configurable port (default 4101). Use a 41xx port on the shared host.
const PORT = Number(process.env.PORT || 4101);

// Bind on all interfaces so it's reachable at 10.192.145.170:PORT
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running:`);
  console.log(`  UI  -> http://${HOST}:${PORT}/   (or http://10.192.145.170:${PORT}/)`);
  console.log(`  API -> http://${HOST}:${PORT}/api/users`);
});
