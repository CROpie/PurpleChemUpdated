import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import Menu from '../components/sections/Menu'
import { Outlet } from 'react-router-dom'
import { getSession } from '../components/utils/SessionAPI'

import { useNavigate } from 'react-router-dom'

export default function Root() {
  const JWT = getSession()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!JWT) navigate('/login')
  }, [JWT])

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
