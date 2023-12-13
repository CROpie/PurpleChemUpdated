import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { MOBILEBREAKPOINT } from '../../../constants'

import { getSessionWithRefresh } from '../../utils/SessionAPI'
import { DataURL } from '../../../constants'

import { useQuery } from '@tanstack/react-query'
import { CustomTable } from '../../minor/Table'
import { useDeleteSupplier } from '../../../mutations/useDeleteSupplier'

// populate 'suppliers' cache with data
function suppliersQuery() {
  return { queryKey: ['suppliers'], queryFn: getSuppliersData, staleTime: 1000 * 60 * 5 }
}
async function getSuppliersData() {
  const JWT = await getSessionWithRefresh()
  if (!JWT) return null

  const response = await fetch(`${DataURL}/supplierslist/`, {
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
  })
  if (!response.ok) {
    toast.error(`Error (${response.statusText})`)
    return
  }
  const json = await response.json()

  return json
}
export const adminSuppliersLoader = (queryClient) => async () => {
  // need to prevent trying to access data before being authorized
  // (separate from preventing routing)
  const JWT = await getSessionWithRefresh()
  if (!JWT) return null

  const data = await queryClient.ensureQueryData(suppliersQuery())

  if (!data) return 'no data'

  return data
}

export default function ModifySupplier() {
  const query = suppliersQuery()
  const { data: suppliers } = useQuery(query)

  const displayProperties = ['id', 'supplierName', 'delete']

  const { mutate: fetchDeleteSupplier } = useDeleteSupplier()

  function handleDelete(id) {
    fetchDeleteSupplier({ id })
  }

  return <CustomTable properties={displayProperties} data={suppliers} handleDelete={handleDelete} />
}
