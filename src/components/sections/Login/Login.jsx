import React from 'react'
import styled from 'styled-components'

import { usePostLogin } from '../../../mutations/usePostLogin.jsx'
import { formInput, formLabel, inputBtn } from '../../styles/mixins'

import { useNavigate } from 'react-router-dom'

import { MOBILEBREAKPOINT } from '../../../constants.js'
import Heading from '../../minor/Heading.jsx'

export default function Login() {
  const [email, setEmail] = React.useState('admin@purplechem.com')
  const [password, setPassword] = React.useState('default')

  const { mutate: fetchPostLogin } = usePostLogin()

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    fetchPostLogin(
      { email, password },
      {
        onSuccess: () => {
          navigate('/inventory')
        },
      }
    )
  }

  return (
    <Wrapper>
      <Heading level={1}>Welcome To PurpleChem!</Heading>
      <Heading level={3}>Please log in to continue.</Heading>
      <form onSubmit={handleSubmit}>
        <Entry>
          <Label htmlFor="email">Email: </Label>
          <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Entry>
        <Entry>
          <Label htmlFor="password">Password: </Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Entry>
        <Button>Log In</Button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: '1rem';
  margin: 0 auto;
`

const Entry = styled.div`
  margin-top: var(--input-marginY);
  margin-bottom: var(--input-marginY);
`

const Label = styled.label`
  ${formLabel}
`

const Input = styled.input`
  ${formInput}
`

const Button = styled.button`
  ${inputBtn}
`
