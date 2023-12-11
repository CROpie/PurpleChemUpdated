import React from 'react'
import styled from 'styled-components'

import { formLabel, formInput, inputBtn } from '../../styles/mixins'

import { usePostLocation } from '../../../mutations/usePostLocation'

export default function NewLocation({ setShowNewLocation }) {
  const [newLocation, setNewLocation] = React.useState('')

  const { mutate: fetchPostLocation } = usePostLocation()

  function handleSubmit(e) {
    e.preventDefault()
    if (!newLocation) return

    fetchPostLocation({ newLocation }, { onSuccess: () => setShowNewLocation(false) })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="newLocation">New Location</Label>
      <Input
        id="newLocation"
        value={newLocation}
        onChange={(e) => setNewLocation(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  )
}

const Label = styled.label`
  ${formLabel}
`

const Input = styled.input`
  ${formInput}
`

const Button = styled.button`
  ${inputBtn}
  color: var(--primary)
`
