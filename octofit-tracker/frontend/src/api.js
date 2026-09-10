const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

// Use a relative URL locally so an unset environment variable never creates an undefined host.
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export function getItems(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export async function fetchCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`)
  if (!response.ok) throw new Error(`Could not load ${resource}.`)
  return getItems(await response.json())
}