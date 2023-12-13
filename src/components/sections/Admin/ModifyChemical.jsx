import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { MOBILEBREAKPOINT } from '../../../constants'

import { getSessionWithRefresh } from '../../utils/SessionAPI'
import { DataURL } from '../../../constants'

import { useQuery } from '@tanstack/react-query'
import { CustomTable } from '../../minor/Table'
import { useDeleteChemical } from '../../../mutations/useDeleteChemical'

// populate 'suppliers' cache with data
function chemicalsQuery() {
  return { queryKey: ['chemicals'], queryFn: getChemicalsData }
}
async function getChemicalsData() {
  const JWT = await getSessionWithRefresh()
  if (!JWT) return null

  const response = await fetch(`${DataURL}/chemicalslist/`, {
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
  })
  if (!response.ok) {
    toast.error(`Error (${response.statusText})`)
    return
  }
  const json = await response.json()

  return json
}
export const adminChemicalsLoader = (queryClient) => async () => {
  // need to prevent trying to access data before being authorized
  // (separate from preventing routing)
  const JWT = await getSessionWithRefresh()
  if (!JWT) return null

  const query = chemicalsQuery()
  const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

  if (!data) return 'no data'

  return data
}

export default function ModifyChemical() {
  const query = chemicalsQuery()
  const { data: chemicals } = useQuery(query)

  const displayProperties = ['id', 'chemicalName', 'CAS', 'delete']

  const { mutate: fetchDeleteChemical } = useDeleteChemical()

  function handleDelete(id) {
    fetchDeleteChemical({ id })
  }

  return <CustomTable properties={displayProperties} data={chemicals} handleDelete={handleDelete} />
}
