import React from 'react'
import styled from 'styled-components'
import JSME from '../../utils/JSME'
import { inputBtn } from '../../styles/mixins'

export default function QueryStructure({ setQueryString }) {
  const formRef = React.useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    let inchi = String(formData.get('inchi'))

    setQueryString(inchi)
  }

  return (
    <Wrapper ref={formRef} onSubmit={handleSubmit}>
      <JSME />
      <Button>Search</Button>
    </Wrapper>
  )
}

const Wrapper = styled.form``

const Button = styled.button`
  ${inputBtn}
`
