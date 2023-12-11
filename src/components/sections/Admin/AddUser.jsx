import React from 'react'
import styled from 'styled-components'
import { formLabel, formInput, inputBtn } from '../../styles/mixins'

import Heading from '../../minor/Heading'
import { usePostUser } from '../../../mutations/usePostUser'

export default function AddUser() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [fullName, setFullName] = React.useState('')

  // admin | user
  const [role, setRole] = React.useState('')

  const { mutate: fetchPostUser } = usePostUser()

  function resetFields() {
    setUsername('')
    setPassword('')
    setFullName('')
    setRole('')
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!username || !password || !fullName || !role) return

    if (role.toLowerCase !== 'admin' || 'user')
      fetchPostUser(
        { username, password, full_name: fullName, role: role.toLowerCase() },
        { onSuccess: resetFields }
      )
  }
  return (
    <Wrapper>
      <Heading level={3}>Add User</Heading>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="username">*Username: </Label>
        <Input
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Label htmlFor="password">*Password: </Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Label htmlFor="fullName">*Full Name: </Label>
        <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />

        <Label htmlFor="role">*Role (admin/user): </Label>
        <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
        <Button>Submit</Button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  margin-top: 2rem;
`

const Label = styled.label`
  ${formLabel}
`

const Input = styled.input`
  ${formInput}
`

const Button = styled.button`
  ${inputBtn}
  color: var(--primary)
`
