import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import Menu from '../components/sections/Menu'
import { Outlet, useLocation } from 'react-router-dom'
import { exchangeRefresh, getSession } from '../components/utils/SessionAPI'

import { Navigate } from 'react-router-dom'
import Login from '../components/sections/Login/Login'

export default function PrivateRoot() {
  // token auth logic for navigation is contained in this component

  // for some reason, just having this hook present will re-render this component on navigation ???
  useLocation()

  // otherwise, this only runs once. So if token expires, getSession() won't re-run
  // which means can still move from page to page on an expired token

  // could put refresh token logic here?

  // useLocation() + this will fix routing on expired token, but api calls need their own solution
  // since the page will still be open when the token expires
  // const JWT = getSession()
  // if (!JWT) {
  //   toast.error('Session has expired.')
  //   return <Navigate to="/" />
  // }

  let JWT = getSession()

  if (!JWT) {
    toast.error('Session has expired.')
    JWT = exchangeRefreshToken()
  }

  const [loadRefresh, setLoadRefresh] = React.useState(false)

  async function exchangeRefreshToken() {
    JWT = await exchangeRefresh()
    setLoadRefresh(true)
    if (!JWT) return <Navigate to="/" />
    setLoadRefresh(false)
  }

  if (loadRefresh) return <p>Loading...</p>

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
