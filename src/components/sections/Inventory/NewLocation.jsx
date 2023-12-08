import React from 'react'
import styled from 'styled-components'

import { formLabel, formInput } from '../../styles/mixins'

import { usePostLocation } from '../../../mutations/usePostLocation'

import { TokenCtx } from '../../../contexts/TokenCtx'

export default function NewLocation({ setShowNewLocation }) {
  const [newLocation, setNewLocation] = React.useState('')
  const { JWT } = React.useContext(TokenCtx)

  const { mutate: fetchPostLocation } = usePostLocation()

  function handleSubmit(e) {
    console.log('handle')
    e.preventDefault()
    if (!newLocation) return

    fetchPostLocation({ newLocation, JWT }, { onSuccess: () => setShowNewLocation(false) })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Label htmlFor="newLocation">New Location</Label>
      <Input
        id="newLocation"
        value={newLocation}
        onChange={(e) => setNewLocation(e.target.value)}
      />
      <button>Submit</button>
    </form>
  )
}

const Label = styled.label`
  ${formLabel}
`

const Input = styled.input`
  ${formInput}
`
