import React from 'react'
import styled from 'styled-components'
import { formLabel, formInput, inputBtn } from '../../styles/mixins'

import Heading from '../../minor/Heading'
import { usePostSupplier } from '../../../mutations/usePostSupplier'
export default function AddSupplier() {
  const [supplierName, setSupplierName] = React.useState('')

  const { mutate: fetchPostSupplier } = usePostSupplier()

  function handleSubmit(e) {
    e.preventDefault()

    if (!supplierName) return

    fetchPostSupplier({ supplierName }, { onSuccess: () => setSupplierName('') })
  }
  return (
    <Wrapper>
      <Heading level={3}>Add Supplier</Heading>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="supplierName">Supplier Name: </Label>
        <Input
          id="supplierName"
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
        />
        <Button>Submit</Button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.main``

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
