import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage, EmptyState, ErrorState } from './Activities.jsx'

function Leaderboard() {
  const [rows, setRows] = useState([]); const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setRows).catch((reason) => setError(reason.message)) }, [])
  return <CollectionPage eyebrow="Friendly competition" title="Leaderboard" intro="The strongest momentum starts with one session." error={error}>{error ? <ErrorState message={error} /> : <div className="rank-list">{rows.sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999)).map((row, index) => <div className={`rank-row ${index === 0 ? 'top-rank' : ''}`} key={row._id}><span className="rank-number">{row.rank ?? index + 1}</span><span className="avatar">{(row.username || '?')[0].toUpperCase()}</span><strong>{row.username || 'Athlete'}</strong><span className="rank-points">{row.points ?? 0} pts</span></div>)}{!rows.length && <EmptyState text="The leaderboard is waiting for its first entries." />}</div>}</CollectionPage>
}
export default Leaderboard