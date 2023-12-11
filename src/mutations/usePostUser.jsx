import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { AuthURL } from '../constants'
import { DataURL } from '../constants'
import { getSessionWithRefresh } from '../components/utils/SessionAPI'

async function postUser({ username, password, full_name, role }) {
  const JWT = await getSessionWithRefresh()
  if (!JWT) throw new Error('Network response was not ok.')

  const authResponse = await postUserAuth({ username, password, role, JWT })

  if (!authResponse) throw new Error('Network response was not ok.')

  const dataResponse = await postUserData({ id: authResponse.id, username, full_name, JWT })

  if (!dataResponse) throw new Error('Network response was not ok.')

  return dataResponse
}

async function postUserAuth({ username, password, role, JWT }) {
  console.log(username, password, role, JWT)
  const response = await fetch(`${AuthURL}/newuser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${JWT}`,
    },
    body: new URLSearchParams({ username, password, role }),
  })

  if (!response.ok) return null

  const json = await response.json()

  return json
}

async function postUserData({ id, username, full_name, JWT }) {
  const response = await fetch(`${DataURL}/user`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    body: JSON.stringify({ id, username, full_name }),
  })

  if (!response.ok) return null

  // My new user function doesn't return any data for some reason
  // so returning some sort of truthy value instead
  return { success: true }
}

export const usePostUser = () => {
  return useMutation({
    mutationFn: async ({ username, password, full_name, role }) =>
      postUser({ username, password, full_name, role }),
    onSuccess: () => {
      toast.success('User Added')
    },
    onError: (error) => {
      console.error('Something went wrong...', error)
      toast.error('Failed to add user.')
    },
  })
}
