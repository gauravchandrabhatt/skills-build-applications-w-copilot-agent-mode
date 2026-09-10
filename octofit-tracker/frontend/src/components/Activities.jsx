import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')
  // API resource: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
  useEffect(() => { fetchCollection('activities').then(setActivities).catch((reason) => setError(reason.message)) }, [])
  return <CollectionPage eyebrow="Movement log" title="Activities" intro="Every session adds up." error={error}>
    <div className="table-wrap"><table><thead><tr><th>Activity</th><th>Duration</th><th>Distance</th><th>Points</th><th>Date</th></tr></thead><tbody>{activities.map((activity) => <tr key={activity._id}><td><strong>{activity.type}</strong></td><td>{activity.durationMinutes} min</td><td>{activity.distanceKm ?? '—'} km</td><td className="points">+{activity.points}</td><td>{activity.recordedAt ? new Date(activity.recordedAt).toLocaleDateString() : '—'}</td></tr>)}</tbody></table>{!activities.length && !error && <EmptyState text="No activities logged yet." />}</div>
  </CollectionPage>
}

export function CollectionPage({ eyebrow, title, intro, error, children }) { return <section className="page-section"><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{intro}</p></div></div>{error ? <ErrorState message={error} /> : children}</section> }
export function EmptyState({ text }) { return <p className="empty-state">{text}</p> }
export function ErrorState({ message }) { return <p className="error-state">{message} Check that the API is running and try again.</p> }
export default Activities