import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { DataURL } from '../constants'
import { getSessionWithRefresh } from '../components/utils/SessionAPI'

async function postLocation({ newLocation: locationName }) {
  const JWT = await getSessionWithRefresh()
  if (!JWT) throw new Error('Network response was not ok.')

  const response = await fetch(`${DataURL}/location/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    body: JSON.stringify({ locationName }),
  })

  if (!response.ok) throw new Error('Network response was not ok.')

  const json = await response.json()

  return json
}

export const usePostLocation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ newLocation }) => postLocation({ newLocation }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      toast.success('Location Added')
    },
    onError: (error) => {
      console.error('Something went wrong...', error)
      toast.error('Failed to add location.')
    },
  })
}
