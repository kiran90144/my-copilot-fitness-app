import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(
          import.meta.env.VITE_CODESPACE_NAME
            ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
            : 'http://localhost:8000/api/workouts'
        );
        const data = await response.json();
        setWorkouts(Array.isArray(data) ? data : data?.results ?? []);
      } catch (error) {
        console.error('Failed to load workouts', error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) return <p>Loading workouts...</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Workouts</h2>
        <ul className="list-group list-group-flush">
          {workouts.map((workout) => (
            <li className="list-group-item" key={workout._id || workout.id || workout.name}>
              <strong>{workout.name}</strong> — {workout.focus}
            </li>
          ))}
          {workouts.length === 0 && <li className="list-group-item text-muted">No workouts found.</li>}
        </ul>
      </div>
    </div>
  );
}
