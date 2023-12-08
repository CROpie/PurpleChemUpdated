import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { DataURL } from '../constants'

async function postLocation({ newLocation: locationName, JWT }) {
  const response = await fetch(`${DataURL}/location`, {
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
    mutationFn: async ({ newLocation, JWT }) => postLocation({ newLocation, JWT }),
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
