
import React, { useState, useEffect } from 'https://esm.sh/react';

function Header() {
  return <h1>React + Express Demo</h1>;
}

function UserList({ users }) {
  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetch('http://localhost:3001/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  function addUser() {
    fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    .then(res => res.json())
    .then(newUser => {
      setUsers([...users, newUser]);
      setName("");
    });
  }

  return (
    <div>
      <Header />
      <UserList users={users} />
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addUser}>Add User</button>
    </div>
  );
}

export default App;
