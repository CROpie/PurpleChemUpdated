import { DataURL } from '../constants'
import { toast } from 'react-toastify'

export async function getQueryData({ queryType, queryString, JWT }) {
  const response = await fetch(
    `${DataURL}/ordersquery?queryType=${queryType}&queryString=${queryString}`,
    {
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    }
  )
  if (!response.ok) {
    toast.error(`Error (${response.statusText})`)
    return
  }

  const json = await response.json()

  return json
}
