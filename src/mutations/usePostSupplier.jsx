import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { DataURL } from '../constants'

async function postSupplier({ supplierName, JWT }) {
  const response = await fetch(`${DataURL}/supplier`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    body: JSON.stringify({ supplierName }),
  })

  if (!response.ok) throw new Error('Network response was not ok.')

  const json = await response.json()

  return json
}

export const usePostSupplier = () => {
  //   const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ supplierName, JWT }) => postSupplier({ supplierName, JWT }),
    onSuccess: () => {
      toast.success('Supplier Added')
    },
    onError: (error) => {
      console.error('Something went wrong...', error)
      toast.error('Failed to add supplier.')
    },
  })
}
