import React from 'react'
import styled from 'styled-components'

import { inputBtn } from '../../styles/mixins'

import { Link, Outlet } from 'react-router-dom'

export default function Admin() {
  return (
    <Wrapper>
      <Sidebar>
        <Link to="adduser">
          <Button>Add User</Button>
        </Link>
        <Link to="addsupplier">
          <Button>Add Supplier</Button>
        </Link>
      </Sidebar>
      <Outlet />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 8px;
`

const Sidebar = styled.section`
  margin-top: 4rem;
`

const Button = styled.button`
  ${inputBtn}
`
