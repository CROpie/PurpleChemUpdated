import React from 'react'
import styled from 'styled-components'

import Menu from '../components/sections/Menu'

import Login from '../components/sections/Login/Login'

export default function PublicRoot() {
  return (
    <Wrapper>
      <p style={{ color: 'white' }}>Public Root</p>
      <Menu />
      <Login />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 2rem auto;
`
