import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { to: '/', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
        <p className="text-muted">A modern multi-tier fitness dashboard powered by React 19, Vite, and the Express API.</p>
        <p className="small text-muted">Set VITE_CODESPACE_NAME in .env.local to use Codespaces URLs such as https://&lt;name&gt;-8000.app.github.dev/api/....</p>
      </header>

      <nav className="nav nav-pills mb-4">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
