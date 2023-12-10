import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import OrderQuery from './OrderQuery'
import OrderStructure from './OrderStructure'
import OrderDetails from './OrderDetails'
import ChemicalProperties from './ChemicalProperties'

import { DataURL } from '../../../constants'
import { inputBtn } from '../../styles/mixins'

import { useQuery } from '@tanstack/react-query'
import { usePostOrder } from '../../../mutations/usePostOrder'
import { redirect } from 'react-router-dom'

import { getSession } from '../../utils/SessionAPI'

// import { TokenCtx } from '../../../contexts/TokenCtx'

// populate 'suppliers' cache with data
function suppliersQuery() {
  return { queryKey: ['suppliers'], queryFn: getSuppliersData, staleTime: 1000 * 60 * 5 }
}
async function getSuppliersData() {
  const JWT = getSession()

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
  const JWT = getSession()

  if (!JWT) {
    toast.error('not logged in...')
    return redirect('/login')
  }

  const query = suppliersQuery()
  const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

  if (!data) return 'no data'

  return data
}

export default function Order() {
  const [chemProperties, setChemProperties] = React.useState({})
  const [searchStrings, setSearchStrings] = React.useState({})

  const queryRef = React.useRef()
  const orderFormRef = React.useRef()

  // const JWT = React.useContext(TokenCtx).getSession()

  const query = suppliersQuery()
  const { data: suppliers } = useQuery(query)

  const { mutate: fetchPostOrder } = usePostOrder()

  // idle | found | notFound
  const [searchStatus, setSearchStatus] = React.useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()

    // if CAS not found, get chemProperties from the form data
    if (searchStatus === 'notFound') {
      const manualChemProperties = getManualInputProperties()
      if (!manualChemProperties) return
      setChemProperties(manualChemProperties)
    }

    const orderData = getOrderData()
    if (!orderData) return

    fetchPostOrder({ chemicalData: chemProperties, orderData }, { onSuccess: resetPage })
  }

  function getManualInputProperties() {
    const formData = new FormData(orderFormRef.current)
    const data = {
      CAS: String(formData.get('CAS')),
      chemicalName: String(formData.get('chemicalName')),
      MW: formData.get('MW') ? String(formData.get('MW')) : null,
      MP: formData.get('MP') ? String(formData.get('MP')) : null,
      BP: formData.get('BP') ? String(formData.get('BP')) : null,
      density: formData.get('density') ? String(formData.get('density')) : null,
      smile: String(formData.get('smile')),
      inchi: String(formData.get('inchi')),
    }

    if (!data.CAS) {
      toast.error('Please enter a CAS number.')
      return
    }
    if (!data.chemicalName) {
      toast.error('Please enter chemical name.')
      return
    }
    if (!data.smile || !data.inchi) {
      toast.error('Please draw a chemical structure.')
      return
    }

    return data
  }

  function getOrderData() {
    const formData = new FormData(orderFormRef.current)
    const data = {
      amount: Number(formData.get('amount')),
      amountUnit: String(formData.get('amountUnit')),
      supplier_id: Number(formData.get('supplierID')),
      supplierPN: String(formData.get('supplierPN')),
    }
    if (!data.amount) {
      toast.error('Please enter an amount.')
      return
    }
    if (!data.amountUnit) {
      toast.error('Please select a unit.')
      return
    }
    if (!data.supplier_id) {
      toast.error('Please select a supplier.')
      return
    }
    return data
  }

  function resetPage() {
    setSearchStatus('idle')
    setChemProperties({})
    setSearchStrings({})
    queryRef.current.reset()
    orderFormRef.current.reset()
  }

  return (
    <Wrapper>
      <OrderQuery
        queryRef={queryRef}
        searchStatus={searchStatus}
        setSearchStatus={setSearchStatus}
        setChemProperties={setChemProperties}
        setSearchStrings={setSearchStrings}
      />
      {searchStatus !== 'idle' && (
        <form ref={orderFormRef} onSubmit={handleSubmit}>
          <ChemPropertyWrapper>
            <OrderStructure searchStatus={searchStatus} chemProperties={chemProperties} />
            <ChemicalProperties
              searchStatus={searchStatus}
              chemProperties={chemProperties}
              searchStrings={searchStrings}
            />
          </ChemPropertyWrapper>

          <OrderDetails suppliers={suppliers} searchStatus={searchStatus} />

          <Button>Submit</Button>
        </form>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.main``

const Button = styled.button`
  ${inputBtn}
`

const ChemPropertyWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
