import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { formLabel, formInput, inputBtn } from '../../styles/mixins'

import ExtendedOrderForm from './ExtendedOrderForm'

const amountUnitList = [
  { label: 'mg', value: 'mg' },
  { label: 'g', value: 'g' },
  { label: 'mL', value: 'mL' },
  { label: 'L', value: 'L' },
]

export default function OrderForm({ suppliers, extendedForm, extendedRef, placeOrder }) {
  const [amount, setAmount] = React.useState('')
  const [amountUnit, setAmountUnit] = React.useState(-1)
  const [supplierID, setSupplierID] = React.useState(-1)

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(extendedRef.target)
    const physData = Object.fromEntries(formData)

    console.log('physData: ', physData)

    if (!amount || !amountUnit || !supplierID) {
      toast.error('Please fill out the necessary fields..')
      return
    }

    if (extendedForm && !physData.chemicalName) {
      toast.error('Please enter name for the chemical.')
      return
    }
    if (extendedForm && !physData.smile) {
      toast.error('Please draw and save the chemical in the field provided.')
      return
    }

    const orderData = {
      amount,
      amountUnit,
      supplier_id: supplierID,
    }

    placeOrder({ orderData, physData })
  }

  return (
    <Wrapper>
      <Label htmlFor="amount">Amount:</Label>
      <Input type="number" value={amount} min="0" onChange={(e) => setAmount(e.target.value)} />

      <Label htmlFor="amountUnit">Unit:</Label>
      <Select id="amountUnit" value={amountUnit} onChange={(e) => setAmountUnit(e.target.value)}>
        <option value={-1} disabled>
          Select Unit:
        </option>
        {amountUnitList.map((unit) => (
          <option key={unit.value} value={unit.value}>
            {unit.value}
          </option>
        ))}
      </Select>

      <Label htmlFor="supplier">Supplier:</Label>
      <Select id="supplier" value={supplierID} onChange={(e) => setSupplierID(e.target.value)}>
        <option value={-1} disabled>
          Select Supplier:
        </option>
        {suppliers.map((supplier) => (
          <option key={supplier.id} value={supplier.id}>
            {supplier.supplierName}
          </option>
        ))}
      </Select>

      {extendedForm && <ExtendedOrderForm extendedRef={extendedRef} />}

      <Button type="button" onClick={handleSubmit}>
        Submit
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.section``

const Label = styled.label`
  ${formLabel}
`

const Input = styled.input`
  ${formInput}
`

const Select = styled.select`
  ${formInput}
`

const Button = styled.button`
  ${inputBtn}
`
