import React from 'react'
import styled from 'styled-components'

import { TokenCtx } from '../../../contexts/TokenCtx'
import { useNavigate } from 'react-router-dom'

import { usePostLogin } from '../../../mutations/usePostLogin.jsx'
import { formInput, formLabel } from '../../styles/mixins'

export default function Login() {
  const [email, setEmail] = React.useState('admin@purplechem.com')
  const [password, setPassword] = React.useState('default')

  const { mutate: fetchPostLogin } = usePostLogin()

  async function handleSubmit(e) {
    e.preventDefault()

    fetchPostLogin({ email, password })
  }

  return (
    <Wrapper>
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
        <button>Log In</button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: '1rem';
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

/*

  const { JWT } = React.useContext(TokenCtx)
  console.log('login JWT: ', JWT)

  const navigate = useNavigate()
  auto redirect if logged in
  React.useEffect(() => {
    if (JWT) navigate('/inventory')
  }, [JWT])
*/
