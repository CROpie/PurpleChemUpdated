import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { getSession } from '../../utils/SessionAPI'

import { inputBtn } from '../../styles/mixins'

import { Link, Outlet, useNavigate } from 'react-router-dom'

export default function Admin() {
  const session = getSession()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!session) {
      toast.error('not logged in...')
      navigate('/login')
    }
  }, [session])

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
