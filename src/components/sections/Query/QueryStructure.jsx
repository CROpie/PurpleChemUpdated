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
      <JSME
        width={window.innerWidth < 550 ? window.innerWidth - 25 : 550}
        height={window.innerWidth < 500 ? window.innerWidth - 25 : 500}
        menuScale={window.innerWidth < 500 ? 1 : 1.5}
      />
      <Button>Search</Button>
    </Wrapper>
  )
}

const Wrapper = styled.form``

const Button = styled.button`
  ${inputBtn}
`
