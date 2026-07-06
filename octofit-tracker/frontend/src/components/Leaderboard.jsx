import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/leaderboard/`);
        const data = await response.json();
        setEntries(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error('Failed to load leaderboard', error);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Leaderboard</h2>
        <ul className="list-group list-group-flush">
          {entries.map((entry) => (
            <li className="list-group-item" key={entry._id || entry.id || entry.userName}>
              <strong>{entry.userName}</strong> — {entry.score} pts
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
