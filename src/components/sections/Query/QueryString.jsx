import React from 'react'
import styled from 'styled-components'

import { formLabel, formInput } from '../../styles/mixins'

export default function QueryString({ setQueryString }) {
  const formRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    let queryString = String(formData.get('querystring'))

    setQueryString(queryString ? queryString : ' ')
  }

  return (
    <Wrapper ref={formRef} onSubmit={handleSubmit}>
      <Label htmlFor="querystring">Chemical name, CAS or user </Label>
      <Input id="querystring" name="querystring" />
    </Wrapper>
  )
}

const Wrapper = styled.form``

const Label = styled.label`
  ${formLabel}
`

const Input = styled.input`
  ${formInput}
`
