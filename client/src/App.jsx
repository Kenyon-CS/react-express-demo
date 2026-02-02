import React, { useEffect, useState } from "https://esm.sh/react@18";

/*
  Important: The frontend uses a *relative* URL for the API.
  That means it automatically talks to the same host + port that served the UI.
  No hard-coded localhost, no separate client port to manage.
*/
const API_BASE = "";

// --- Components (functions returning JSX) ---
function Header() {
  return (
    <header style={{ marginBottom: 12 }}>
      <h1 style={{ margin: 0 }}>React + Express Demo</h1>
      <p style={{ margin: "6px 0 0 0", color: "#444" }}>
        Components, props, state, events, and fetching JSON from an API
      </p>
    </header>
  );
}

function UserList({ users }) {
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

export default function App() {
  // --- State ---
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Effect: fetch once on load ---
  useEffect(() => {
    fetch(`${API_BASE}/api/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(String(err));
        setLoading(false);
      });
  }, []);

  // --- Event handler: POST then update state ---
  function addUser() {
    const trimmed = name.trim();
    if (!trimmed) return;

    setError(null);

    fetch(`${API_BASE}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: trimmed }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "request failed");
        return data;
      })
      .then((newUser) => {
        setUsers([...users, newUser]);
        setName("");
      })
      .catch((err) => setError(String(err.message || err)));
  }

  return (
    <div
      style={{
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        padding: 18,
        maxWidth: 650,
      }}
    >
      <Header />

      {/* Conditional rendering */}
      {loading && <p>Loading users…</p>}
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}

      {!loading && !error && (
        <section>
          <h2 style={{ marginBottom: 6 }}>Users</h2>
          <UserList users={users} />
        </section>
      )}

      <hr style={{ margin: "16px 0" }} />

      <section>
        <h2 style={{ marginBottom: 6 }}>Add a user</h2>

        {/* Controlled input */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type a name"
          style={{ padding: 8, width: "70%", marginRight: 8 }}
        />

        <button onClick={addUser} style={{ padding: "8px 12px" }}>
          Add User
        </button>

        <p style={{ color: "#555", marginTop: 10 }}>
          Try: add a name, refresh the page, and notice the list is loaded from
          the Express API.
        </p>
      </section>
    </div>
  );
}
