import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { DataURL } from '../constants'
import { getSessionWithRefresh } from '../components/utils/SessionAPI'

import { useQueryClient } from '@tanstack/react-query'

async function deleteOrder({ id }) {
  const JWT = await getSessionWithRefresh()
  if (!JWT) throw new Error('Network response was not ok.')

  const response = await fetch(`${DataURL}/order?order_id=${id}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
  })

  if (!response.ok) throw new Error('Network response was not ok.')

  const json = await response.json()

  return json
}

export const useDeleteOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }) => deleteOrder({ id }),
    onSuccess: () => {
      toast.success('Order Deleted')
      queryClient.invalidateQueries({ queryKey: ['orders'] })
    },
    onError: (error) => {
      console.error('Something went wrong...', error)
      toast.error('Failed to delete order.')
    },
  })
}
