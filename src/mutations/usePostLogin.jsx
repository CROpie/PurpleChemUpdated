import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AuthURL } from '../constants'

import { toast } from 'react-toastify'

import { logIn } from '../components/utils/SessionAPI'

async function postLogin({ email: username, password }) {
  const response = await fetch(`${AuthURL}/token`, {
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

  return useMutation({
    mutationFn: async ({ email, password }) => postLogin({ email, password }),
    onSuccess: (data) => {
      toast.success('Logged in!')
      logIn({ data })
    },
    onError: (error) => {
      toast.error('Unknown Credentials')
      console.error('Something went wrong...', error)
    },
  })
}
