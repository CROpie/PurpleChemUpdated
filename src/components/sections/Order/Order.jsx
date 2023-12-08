import React from 'react'
import styled from 'styled-components'

import { toast } from 'react-toastify'

import { useQuery } from '@tanstack/react-query'

import { TokenCtx } from '../../../contexts/TokenCtx'
import { usePostOrder } from '../../../mutations/usePostOrder'

import OrderCAS from './OrderCAS'
import OrderForm from './OrderForm'

import { DataURL } from '../../../constants'

// populate 'suppliers' cache with data
function suppliersQuery() {
  return { queryKey: ['suppliers'], queryFn: getSuppliersData, staleTime: 1000 * 60 * 5 }
}

async function getSuppliersData() {
  const JWT = window.localStorage.getItem('access-token')

  const response = await fetch(`${DataURL}/supplierslist`, {
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
  })
  if (!response.ok) {
    toast.error(`Error (${response.statusText})`)
    return
  }
  const json = await response.json()

  return json
}

export const suppliersLoader = (queryClient) => async () => {
  const query = suppliersQuery()
  const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

  if (!data) return 'no data'

  return data
}

/*

Change the way order is written
Just have two big objects in Order.jsx
One is for chem properties, and one is for order details
Each keypress will re-write the object, but it will look much cleaner

Show the structure after a search. Show other properties too? Don't really want to allow them to be modified by users...
*/

export default function Order() {
  const [newChemical, setNewChemical] = React.useState({})
  const [extendedForm, setExtendedForm] = React.useState(false)
  const [status, setStatus] = React.useState('idle')

  const { JWT } = React.useContext(TokenCtx)

  const query = suppliersQuery()
  const { data: suppliers } = useQuery(query)

  const casRef = React.useRef()
  const extendedRef = React.useRef()

  const { fetchPostOrder } = usePostOrder({ JWT })

  // gets called from OrderForm
  // data contains ordering info, and if inputted manually, chemical properties & structure data
  async function placeOrder({ orderData, physData }) {
    //

    let chemicalData = {}
    // if chemical data wasn't found by cas or database, get data via the form in ExtendedOrderForm
    if (extendedForm) {
      // determine CAS number via casRef
      const casNumberData = new FormData(casRef.current)
      const casNumber = casNumberData.get('cas')

      chemicalData = {
        CAS: String(casNumber),
        chemicalName: String(physData.chemicalName),
        MW: String(physData.MW),
        MP: String(physData.MP),
        BP: String(physData.BP),
        density: String(physData.density),
        smile: String(physData.smile),
        inchi: String(physData.inchi),
      }
    } else {
      // otherwise, it will be stored in newChemical already
      chemicalData = newChemical
    }
    console.log({ chemicalData, orderData })
    return
    fetchPostOrder({ chemicalData, orderData })
  }

  return (
    <Wrapper>
      {/* <Heading level={3}>Order</Heading> */}
      <OrderCAS
        setNewChemical={setNewChemical}
        setExtendedForm={setExtendedForm}
        setStatus={setStatus}
        casRef={casRef}
      />
      {status === 'loading' && <LoadingMsg>Searching...</LoadingMsg>}
      {status === 'searched' && (
        <OrderForm
          suppliers={suppliers}
          placeOrder={placeOrder}
          extendedForm={extendedForm}
          extendedRef={extendedRef}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled.main`
  margin-top: 2rem;
`

const LoadingMsg = styled.p`
  color: 'var(--text-color)';
`
