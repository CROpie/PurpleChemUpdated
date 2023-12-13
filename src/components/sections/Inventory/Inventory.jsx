import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { MOBILEBREAKPOINT } from '../../../constants'

import { useQuery } from '@tanstack/react-query'

import { DataURL } from '../../../constants'

import LocationsSidebar from './LocationsSidebar'
import OrdersAccordion from './OrdersAccordion'

import { getSessionWithRefresh } from '../../utils/SessionAPI'

// populate 'inventory' cache with data
function inventoryQuery() {
  // staleTime require to ensure fetch doesn't occur on every load
  return { queryKey: ['inventory'], queryFn: getInventoryData, staleTime: 1000 * 60 * 5 }
}

async function getInventoryData() {
  const JWT = await getSessionWithRefresh()

  if (!JWT) return null

  const response = await fetch(`${DataURL}/inventory/`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${JWT}`,
    },
  })
  if (!response.ok) {
    toast.error(`Error (${response.statusText})`)
    return
  }
  const json = await response.json()

  return json
}

export const inventoryLoader = (queryClient) => async () => {
  // need to prevent trying to access data before being authorized
  // (separate from preventing routing)
  const JWT = await getSessionWithRefresh()

  if (!JWT) return null

  const data = await queryClient.ensureQueryData(inventoryQuery())
  // above is the same as below, included in v4.18.0
  // const query = inventoryQuery()
  // const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

  if (!data) return 'no data'

  return data
}

export default function Inventory() {
  // retrieve data from cache
  const query = inventoryQuery()
  const { data } = useQuery(query)
  const { locationsList: locations, ordersList: orders } = data

  const [selectedLocation, setSelectedLocation] = React.useState({ id: 'all', locationName: 'all' })

  return (
    <Wrapper>
      <Layout>
        <LocationsSidebar
          locations={locations}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
        <OrdersAccordion
          orders={orders}
          selectedLocation={selectedLocation}
          locations={locations}
        />
      </Layout>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  margin-top: 2rem;
`

const Layout = styled.section`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 4px;

  @media (${MOBILEBREAKPOINT}) {
    grid-template-columns: 1fr;
  }
  gap: 24px;
`
