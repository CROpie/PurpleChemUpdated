import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { DataURL } from '../constants'
import { getSessionWithRefresh } from '../components/utils/SessionAPI'

async function postSupplier({ supplierName }) {
  const JWT = await getSessionWithRefresh()
  if (!JWT) throw new Error('Network response was not ok.')

  const response = await fetch(`${DataURL}/supplier/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    body: JSON.stringify({ supplierName }),
  })

  if (!response.ok) throw new Error('Network response was not ok.')

  const json = await response.json()

  return json
}

export const usePostSupplier = () => {
  return useMutation({
    mutationFn: async ({ supplierName }) => postSupplier({ supplierName }),
    onSuccess: () => {
      toast.success('Supplier Added')
    },
    onError: (error) => {
      console.error('Something went wrong...', error)
      toast.error('Failed to add supplier.')
    },
  })
}
