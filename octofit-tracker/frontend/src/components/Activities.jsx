import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../lib/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/activities/`);
        const data = await response.json();
        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error('Failed to load activities', error);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  if (loading) return <p>Loading activities...</p>;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title h4">Activities</h2>
        <ul className="list-group list-group-flush">
          {activities.map((activity) => (
            <li className="list-group-item" key={activity._id || activity.id || activity.type}>
              <strong>{activity.type}</strong> — {activity.durationMinutes} min
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
