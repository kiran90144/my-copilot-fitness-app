import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        const data = await response.json();
        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error('Failed to load users', error);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Users</h2>
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li className="list-group-item" key={user._id || user.id || user.email}>
              <strong>{user.name}</strong> — {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
