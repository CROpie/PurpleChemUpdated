// getSession
// if no token, try to refresh token
// if still no token, then give error

// want to consolidate all API calls to the database in this function

// so can do something like: const response = DataAPI({headers, body})

export async function DataAPI({ path, method, headers, body }) {
  const JWT = getSession()

  if (!JWT) {
    // refresh token logic here?
    toast.error('Session has expired.')
    throw new Error('Network response was not ok.')
  }
  const response = await fetch(`${DataURL}/${path}`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    body: JSON.stringify(patchInventoryItem),
  })

  if (!response.ok) throw new Error('Network response was not ok.')

  const json = await response.json()
  return json
}

/*
async function patchInventory({ patchInventoryItem }) {
  const JWT = getSession()

  // refresh token logic here?
  if (!JWT) {
    toast.error('Session has expired.')
    throw new Error('Network response was not ok.')
  }

  const response = await fetch(`${DataURL}/inventory`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    body: JSON.stringify(patchInventoryItem),
  })
  if (!response.ok) throw new Error('Network response was not ok.')

  const json = await response.json()
  return json
}
*/
