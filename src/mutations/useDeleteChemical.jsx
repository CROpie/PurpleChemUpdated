import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

import { DataURL } from '../constants'
import { getSessionWithRefresh } from '../components/utils/SessionAPI'

import { useQueryClient } from '@tanstack/react-query'

async function deleteChemical({ id }) {
  const JWT = await getSessionWithRefresh()
  if (!JWT) throw new Error('Network response was not ok.')

  const response = await fetch(`${DataURL}/chemical/?chemical_id=${id}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
  })

  if (!response.ok) throw new Error('Network response was not ok.')

  const json = await response.json()

  return json
}

export const useDeleteChemical = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }) => deleteChemical({ id }),
    onSuccess: () => {
      toast.success('Chemical Deleted')
      queryClient.invalidateQueries({ queryKey: ['chemicals'] })
    },
    onError: (error) => {
      console.error('Something went wrong...', error)
      toast.error('Failed to delete chemical.')
    },
  })
}
