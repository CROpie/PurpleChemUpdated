import React from 'react'
import styled from 'styled-components'
import { formLabel, formInput, inputBtn } from '../../styles/mixins'

import Heading from '../../minor/Heading'
import { usePostSupplier } from '../../../mutations/usePostSupplier'
// import { TokenCtx } from '../../../contexts/TokenCtx'

export default function AddSupplier() {
  const [supplierName, setSupplierName] = React.useState('')
  const JWT = React.useContext(TokenCtx).getSession()

  const { mutate: fetchPostSupplier } = usePostSupplier()

  function handleSubmit(e) {
    e.preventDefault()

    if (!supplierName) return

    fetchPostSupplier({ supplierName, JWT }, { onSuccess: () => setSupplierName('') })
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

const Wrapper = styled.main`
  margin-top: 2rem;
`

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
