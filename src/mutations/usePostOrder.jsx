import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { DataURL } from '../constants'

async function postOrder({ chemicalData, orderData, JWT }) {
  const response = await fetch(`${DataURL}/order`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    body: JSON.stringify({ chemicalData, orderData }),
  })

  if (!response.ok) throw new Error('Network response was not ok.')

  const json = await response.json()

  return json
}

export const usePostOrder = ({ JWT }) => {
  return useMutation({
    mutationFn: async ({ chemicalData, orderData }) => postOrder({ chemicalData, orderData, JWT }),
    onSuccess: () => toast.success('Order placed'),
    onError: (error) => {
      console.error('Something went wrong...', error)
      toast.error('Failed place order...')
    },
  })
}
