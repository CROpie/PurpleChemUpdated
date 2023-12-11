import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import Menu from '../components/sections/Menu'
import { Outlet, useLocation } from 'react-router-dom'

import Login from '../components/sections/Login/Login'

import { getSessionWithRefresh } from '../components/utils/SessionAPI'

export default function Root() {
  // token auth logic for navigation is contained in this component

  // for some reason, just having this the useLocation() hook present will re-render this component on navigation ???

  // otherwise, this only runs once. So if token expires, getSession() won't re-run
  // which means can still move from page to page on an expired token

  // useLocation() + this will fix routing on expired token, but api calls need their own solution
  // since the page will still be open when the token expires

  const [JWT, setJWT] = React.useState()

  const location = useLocation()

  React.useEffect(() => {
    async function testSession() {
      const token = await getSessionWithRefresh()
      setJWT(token)
    }

    testSession()
  }, [location])

  return (
    <Wrapper>
      <p style={{ color: 'white' }}>Private Root</p>
      <Menu />
      {JWT ? <Outlet /> : <Login />}
    </Wrapper>
  )
}

const Wrapper = styled.main`
  max-width: 1000px;
  margin: 2rem auto;
`
