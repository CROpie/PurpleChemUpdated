import { postRefreshToken } from '../../mutations/postRefreshToken'
import { toast } from 'react-toastify'

export function logIn({ data }) {
  setCookie({ name: 'session', value: data.access_token, time: 1000 * 60 * 60 * 30 })
  setCookie({ name: 'refresh', value: data.refresh_token, time: 1000 * 60 * 60 * 12 })
}

export function logOut() {
  deleteCookie({ name: 'session' })
  deleteCookie({ name: 'refresh' })
}

export async function exchangeRefresh() {
  const refresh_token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('refresh='))
    ?.split('=')[1]

  if (!refresh_token) return null

  console.log('attempting to exchange refresh token')
  const refreshData = await postRefreshToken({ refresh_token })

  if (!refreshData) return null

  setCookie({ name: 'session', value: refreshData.access_token, time: 1000 * 60 * 30 })

  const token = getSession()
  return token
}

export function getSession() {
  const session = document.cookie
    .split('; ')
    .find((row) => row.startsWith('session='))
    ?.split('=')[1]

  return session
}

function setCookie({ name, value, time }) {
  const expires = new Date()
  expires.setTime(expires.getTime() + time)
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}`
}

function deleteCookie({ name }) {
  setCookie({ name, value: '', time: 0 })
}

// gets a token from the session cookie if available
// uses a refresh token to generate a new token if session has expired
// toasts error "session has expired" and return nothing if refresh token has also expired
export async function getSessionWithRefresh() {
  let JWT = getSession()

  if (!JWT) {
    const refreshedToken = await exchangeRefresh()

    if (!refreshedToken) {
      toast.error('Session has expired.')
      // throw new Error('Network response was not ok.')
      return null
    } else {
      JWT = refreshedToken
    }
  }

  return JWT
}
