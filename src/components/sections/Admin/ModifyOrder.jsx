import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { MOBILEBREAKPOINT } from '../../../constants'

import { getSessionWithRefresh } from '../../utils/SessionAPI'
import { DataURL } from '../../../constants'

import { useQuery } from '@tanstack/react-query'
import { CustomTable } from '../../minor/Table'
import { useDeleteOrder } from '../../../mutations/useDeleteOrder'

// populate 'orders' cache with data
function ordersQuery() {
  return { queryKey: ['orders'], queryFn: getOrdersData, staleTime: 1000 * 60 * 5 }
}
async function getOrdersData() {
  const JWT = await getSessionWithRefresh()
  if (!JWT) return null

  const response = await fetch(`${DataURL}/orderslist/`, {
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
  })
  if (!response.ok) {
    toast.error(`Error (${response.statusText})`)
    return
  }
  const json = await response.json()

  return json
}
export const adminOrdersLoader = (queryClient) => async () => {
  // need to prevent trying to access data before being authorized
  // (separate from preventing routing)
  const JWT = await getSessionWithRefresh()
  if (!JWT) return null

  const data = await queryClient.ensureQueryData(ordersQuery())

  if (!data) return 'no data'

  return data
}

export default function ModifyOrder() {
  const query = ordersQuery()
  const { data: orders } = useQuery(query)

  const flattenedOrders = orders.map((order) => ({
    id: order.id,
    chemicalName: order.chemical.chemicalName,
    supplierName: order.supplier.supplierName,
    user: order.user.full_name,
  }))

  const displayProperties = ['id', 'user', 'chemicalName', 'supplierName', 'delete']

  const { mutate: fetchDeleteOrder } = useDeleteOrder()

  function handleDelete(id) {
    fetchDeleteOrder({ id })
  }

  return (
    <CustomTable
      properties={displayProperties}
      data={flattenedOrders}
      handleDelete={handleDelete}
    />
  )
}
