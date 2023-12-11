import { getSession } from '../components/utils/SessionAPI'
import { DataURL } from '../constants'
import { toast } from 'react-toastify'

export async function getQueryData({ queryType, queryString }) {
  // need to do this since it is called when the page is rendered due to useQuery
  if (!queryType || !queryString) return null

  const JWT = getSession()

  // refresh token logic here?
  if (!JWT) {
    toast.error('Session has expired.')
    throw new Error('Network response was not ok.')
  }

  const response = await fetch(
    `${DataURL}/ordersquery?queryType=${queryType}&queryString=${queryString}`,
    {
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    }
  )
  if (!response.ok) {
    toast.error(`Error (${response.statusText})`)
    return null
  }

  const json = await response.json()

  return json
}
