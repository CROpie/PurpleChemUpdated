import React from 'react'
import styled from 'styled-components'
import { formInput, formLabel, inputBtn } from '../../styles/mixins'

import { usePatchInventory } from '../../../mutations/usePatchInventory'

export default function OrderAdjust({ order, locations }) {
  const [amount, setAmount] = React.useState(order.amount)
  const [locationID, setLocationID] = React.useState(order.location_id ? order.location_id : -1)

  const { mutate: fetchPatchInventory } = usePatchInventory()

  function handleSubmit(e) {
    e.preventDefault()

    // null is allowed for location_id, so need to change from -1 when on "select location"
    fetchPatchInventory({
      patchInventoryItem: {
        id: order.id,
        amount: Number(amount),
        isConsumed: Number(amount) === 0 ? true : false,
        location_id: locationID ? Number(locationID) : null,
      },
    })
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="amount">Amount Remaining ({order.amountUnit}) </Label>
        <Input
          id="amount"
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Label htmlFor="location">Select Location</Label>
        <Select id="location" value={locationID} onChange={(e) => setLocationID(e.target.value)}>
          <option value={-1}>Select Location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.locationName}
            </option>
          ))}
        </Select>
        <Button>Update</Button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  margin: 0;
`

const Form = styled.form`
  display: flex;
  align-items: end;
`

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
  color: var(--primary)
`
