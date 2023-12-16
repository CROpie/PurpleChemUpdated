import { postRefreshToken } from '../../mutations/postRefreshToken'
import { toast } from 'react-toastify'

export function logIn({ data }) {
  setCookie({ name: 'session', value: data.access_token, time: 1000 * 60 * 30 })
  setCookie({ name: 'refresh', value: data.refresh_token, time: 1000 * 60 * 60 * 12 })
}

export function logOut() {
  toast.success('Logged out.')
  deleteCookie({ name: 'session' })
  deleteCookie({ name: 'refresh' })
}

export async function exchangeRefresh() {
  const refreshTokenPlusExpiry = document.cookie
    .split('; ')
    .find((row) => row.startsWith('refresh='))
    ?.split('=')[1]

  if (!refreshTokenPlusExpiry) return null

  const refresh_token = refreshTokenPlusExpiry.split('@@@')[0]

  // check for expiry
  const expiry = new Date(refreshTokenPlusExpiry.split('@@@')[1])
  const currentTime = new Date()

  if (expiry < currentTime) return

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

  if (!session) return

  const token = session.split('@@@')[0]

  // check for expiry
  const expiry = new Date(session.split('@@@')[1])
  const currentTime = new Date()

  if (expiry < currentTime) return

  return token
}

function setCookie({ name, value, time }) {
  // cookies are not automatically deleted when they expire
  // so will save the time as part of the string, then check it on retrieval

  const expires = new Date()
  expires.setTime(expires.getTime() + time)
  const valueExpiry = `${value}@@@${expires}`
  // document.cookie = `${name}=${value}; expires=${expires.toUTCString()}`
  document.cookie = `${name}=${valueExpiry}; expires=${expires.toUTCString()}`
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
      return null
    } else {
      JWT = refreshedToken
    }
  }

  return JWT
}
