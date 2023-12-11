import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { DataURL } from '../constants'
import { getSession } from '../components/utils/SessionAPI'

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

export const usePatchInventory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ patchInventoryItem }) => patchInventory({ patchInventoryItem }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      toast.success('Updated.')
    },
    onError: (error) => {
      console.error('Something went wrong...', error)
      toast.error('Failed to modify item.')
    },
  })
}
