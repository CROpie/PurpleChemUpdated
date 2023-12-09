import React from 'react'
import styled from 'styled-components'
import { inputBtn, formInput, formLabel } from '../../styles/mixins'

const amountUnitList = [
  { label: 'mg', value: 'mg' },
  { label: 'g', value: 'g' },
  { label: 'mL', value: 'mL' },
  { label: 'L', value: 'L' },
]

export default function OrderDetails({ suppliers }) {
  const [amount, setAmount] = React.useState('')
  const [amountUnit, setAmountUnit] = React.useState(-1)
  const [supplierID, setSupplierID] = React.useState(-1)
  const [supplierPN, setSupplierPN] = React.useState('')

  return (
    <Wrapper>
      <InputsWrapper>
        <div>
          <Label htmlFor="amount">*Amount:</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            value={amount}
            min="0"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="amountUnit">*Unit:</Label>
          <Select
            id="amountUnit"
            value={amountUnit}
            onChange={(e) => setAmountUnit(e.target.value)}
            name="amountUnit"
          >
            <option value={-1} disabled>
              Select Unit:
            </option>
            {amountUnitList.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.value}
              </option>
            ))}
          </Select>
        </div>
      </InputsWrapper>

      <InputsWrapper>
        <div>
          <Label htmlFor="supplier">*Supplier:</Label>
          <Select
            id="supplier"
            name="supplierID"
            value={supplierID}
            onChange={(e) => setSupplierID(e.target.value)}
          >
            <option value={-1} disabled>
              Select Supplier:
            </option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.supplierName}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <Label htmlFor="supplierPN">Product Number:</Label>
          <Input
            id="supplierPN"
            name="supplierPN"
            value={supplierPN}
            onChange={(e) => setSupplierPN(e.target.value)}
          />
        </div>
      </InputsWrapper>
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

const InputsWrapper = styled.div`
  display: flex;
  & > div {
    flex: 1;
  }
`
