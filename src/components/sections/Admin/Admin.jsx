import React from 'react'
import styled from 'styled-components'
import { MOBILEBREAKPOINT } from '../../../constants'

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
        <Link to="modifysupplier">
          <Button>Modify Suppliers</Button>
        </Link>
        <Link to="modifychemical">
          <Button>Modify Chemicals</Button>
        </Link>
        <Link to="modifyorder">
          <Button>Modify Orders</Button>
        </Link>
      </Sidebar>
      <Outlet />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 16px;

  @media (${MOBILEBREAKPOINT}) {
    grid-template-columns: 1fr;
  }
`

const Sidebar = styled.section``

const Button = styled.button`
  ${inputBtn}
`
