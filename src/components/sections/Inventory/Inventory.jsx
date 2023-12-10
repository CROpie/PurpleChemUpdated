import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

// import { TokenCtx, getSession } from '../../../contexts/TokenCtx'
import { redirect, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { DataURL } from '../../../constants'

import Heading from '../../minor/Heading'

import LocationsSidebar from './LocationsSidebar'
import OrdersAccordion from './OrdersAccordion'

import { getSession } from '../../utils/SessionAPI'

// populate 'inventory' cache with data
function inventoryQuery() {
  return { queryKey: ['inventory'], queryFn: getInventoryData, staleTime: 1000 * 60 * 5 }
}

async function getInventoryData() {
  const JWT = getSession()

  const response = await fetch(`${DataURL}/inventory`, {
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
  })
  if (!response.ok) {
    toast.error(`Error (${response.statusText})`)
    return
  }
  const json = await response.json()

  return json
}

export const inventoryLoader = (queryClient) => async () => {
  const JWT = getSession()

  if (!JWT) {
    toast.error('not logged in...')
    return redirect('/login')
  }

  const query = inventoryQuery()
  const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

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
`

/*
need to get this to work properly, because it isn't currently
(localStorage doesn't auto erase, when the token times out then things start going wrong)

  auto redirect if not logged in
    const { JWT } = React.useContext(TokenCtx)
    console.log('inventory JWT: ', JWT)

    const navigate = useNavigate()
    React.useEffect(() => {
      console.log('???')
      if (!JWT) navigate('/')
    }, [JWT])
*/
