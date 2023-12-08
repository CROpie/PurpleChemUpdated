import React from 'react'
import styled from 'styled-components'

import Menu from '../components/sections/Menu'
import { Outlet } from 'react-router-dom'

export default function Root() {
  return (
    <Wrapper>
      <Menu />
      <Outlet />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 2rem auto;
`
