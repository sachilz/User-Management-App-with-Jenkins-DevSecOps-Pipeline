import React, { useEffect, useState, useCallback } from "react";

/* ✅ Move styles OUTSIDE component (Sonar improvement) */
const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f4f7f6",
    minHeight: "100vh",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
  },
  header: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    flex: 1,
  },
  btnPrimary: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  th: {
    backgroundColor: "#f8f9fa",
    padding: "12px",
    textAlign: "left",
    borderBottom: "2px solid #dee2e6",
    color: "#495057",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee",
  },
  btnEdit: {
    backgroundColor: "#ffc107",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    marginRight: "5px",
    cursor: "pointer",
  },
  btnDelete: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const BASE_URL = process.env.REACT_APP_BACKEND_URL || "/api";

  /* 📥 GET users */
  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/users`);

      if (!res.ok) {
        throw new Error(`Failed to fetch users (${res.status})`);
      }

      const data = await res.json();
      setUsers(data);
      setError("");
    } catch (err) {
      setError("Cannot reach backend API. Check backend container and env.");
      console.error(err);
    }
  }, [BASE_URL]);

  /* 🔄 Initial load + polling */
  useEffect(() => {
    fetchUsers();

    const interval = setInterval(fetchUsers, 3000);

    return () => clearInterval(interval);
  }, [fetchUsers]);

  /* ➕ CREATE / ✏️ UPDATE */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editId
        ? `${BASE_URL}/user/${editId}`
        : `${BASE_URL}/user`;

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });

      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }

      setName("");
      setAge("");
      setEditId(null);
      fetchUsers();
      setError("");
    } catch (err) {
      setError("Request failed. Please check backend.");
      console.error(err);
    }
  };

  /* ❌ DELETE */
  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/user/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Delete failed (${res.status})`);
      }

      fetchUsers();
      setError("");
    } catch (err) {
      setError("Delete failed. Try again.");
      console.error(err);
    }
  };

  /* ✏️ EDIT */
  const editUser = (user) => {
    setName(user.name);
    setAge(user.age);
    setEditId(user._id);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.header}>User Management</h2>

        {error && (
          <p style={{ color: "#dc3545", marginBottom: "12px" }}>
            {error}
          </p>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.btnPrimary}>
            {editId ? "Update" : "Add User"}
          </button>
        </form>

        {/* TABLE */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Age</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.age}</td>
                <td style={styles.td}>
                  <button
                    onClick={() => editUser(user)}
                    style={styles.btnEdit}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUser(user._id)}
                    style={styles.btnDelete}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default App;