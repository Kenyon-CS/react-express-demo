
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Fake data (stands in for a database)
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const user = { id: Date.now(), name: req.body.name };
  users.push(user);
  res.json(user);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
