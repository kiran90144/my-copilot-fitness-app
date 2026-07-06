import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/teams/`);
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error('Failed to load teams', error);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) return <p>Loading teams...</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Teams</h2>
        <ul className="list-group list-group-flush">
          {teams.map((team) => (
            <li className="list-group-item" key={team._id || team.id || team.name}>
              <strong>{team.name}</strong> — {team.sport}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
