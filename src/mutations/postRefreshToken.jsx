import { AuthURL } from '../constants'

export async function postRefreshToken({ refresh_token }) {
  const response = await fetch(AuthURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // body: new URLSearchParams({ refresh_token }),
    body: JSON.stringify({ refresh_token }),
  })

  if (!response.ok) throw new Error('Network response was not ok.')

  // access_token, refresh_token, role, token_type: "bearer"
  const json = await response.json()

  return json
}
