import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/">
          <span className="brand-mark">O</span>
          <span>Octofit <strong>Tracker</strong></span>
        </NavLink>
        <span className="status-pill"><span className="status-dot" /> Training hub</span>
      </header>
      <div className="workspace">
        <aside className="sidebar" aria-label="Primary navigation">
          <p className="eyebrow">Workspace</p>
          <nav className="nav-list">
            <NavLink end to="/"><span>*</span> Overview</NavLink>
            <NavLink to="/activities"><span>o</span> Activities</NavLink>
            <NavLink to="/leaderboard"><span>^</span> Leaderboard</NavLink>
            <NavLink to="/teams"><span>+</span> Teams</NavLink>
            <NavLink to="/users"><span>@</span> Members</NavLink>
            <NavLink to="/workouts"><span>#</span> Workouts</NavLink>
          </nav>
          <div className="sidebar-note"><span>Weekly focus</span><strong>Show up. Move well.</strong><small>Keep your streak alive this week.</small></div>
        </aside>
        <main className="content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function Overview() {
  return (
    <section className="page-section">
      <div className="page-heading">
        <div><p className="eyebrow">Thursday, September 10</p><h1>Good morning, athletes.</h1><p className="lede">A clear view of your team&apos;s momentum, all in one place.</p></div>
        <NavLink className="primary-action" to="/workouts">Browse workouts <span>&gt;</span></NavLink>
      </div>
      <div className="overview-banner"><div><p className="eyebrow">Your next best move</p><h2>Consistency beats intensity.</h2><p>Log a small win today and let the points follow.</p></div><NavLink className="light-action" to="/activities">View activity <span>&gt;</span></NavLink></div>
      <div className="overview-grid"><NavLink className="overview-card" to="/leaderboard"><span className="card-kicker">Compete</span><strong>See the leaderboard</strong><span>Find your next target &gt;</span></NavLink><NavLink className="overview-card warm" to="/teams"><span className="card-kicker">Connect</span><strong>Meet your teams</strong><span>Build momentum together &gt;</span></NavLink></div>
    </section>
  )
}

export default App
