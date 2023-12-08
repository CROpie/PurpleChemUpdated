import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthURL } from '../constants'
import { TokenCtx } from '../contexts/TokenCtx'

import { toast } from 'react-toastify'

async function postLogin({ email: username, password }) {
  const response = await fetch(AuthURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password }),
  })

  if (!response.ok) throw new Error('Network response was not ok.')

  // access_token, refresh_token, role, token_type: "bearer"
  const json = await response.json()

  return json
}

export const usePostLogin = () => {
  const queryClient = useQueryClient()
  const { setJWT } = React.useContext(TokenCtx)

  return useMutation({
    mutationFn: async ({ email, password }) => postLogin({ email, password }),
    onSuccess: (data) => {
      toast.success('Logged in!')
      setJWT(data.access_token)
    },
    onError: (error) => {
      toast.error('Unknown Credentials')
      console.error('Something went wrong...', error)
    },
  })
}
