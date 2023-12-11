import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { DataURL } from '../constants'
import { getSessionWithRefresh } from '../components/utils/SessionAPI'

async function postOrder({ chemicalData, orderData }) {
  const JWT = await getSessionWithRefresh()
  if (!JWT) throw new Error('Network response was not ok.')

  const response = await fetch(`${DataURL}/order`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    body: JSON.stringify({ chemicalData, orderData }),
  })

  if (!response.ok) throw new Error('Network response was not ok.')

  const json = await response.json()

  return json
}

export const usePostOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ chemicalData, orderData }) => postOrder({ chemicalData, orderData }),
    onSuccess: () => {
      toast.success('Order placed')
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
    },
    onError: (error) => {
      console.error('Something went wrong...', error)
      toast.error('Failed to place order...')
    },
  })
}
