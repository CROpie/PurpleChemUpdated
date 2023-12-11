import { postRefreshToken } from '../../mutations/postRefreshToken'

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
}

export function getSession() {
  const session = document.cookie
    .split('; ')
    .find((row) => row.startsWith('session='))
    ?.split('=')[1]

  if (!session) {
    // Couldn't get this to work properly. Probably need to find a new strategy - or do it on the backend instead.
    // getSession() is a synchronous function, but to include fetching a refresh token, it needs to be async
    // but that changes the way that getSession() needs to be implemented.
    // causes problems with react-router because once a route is loaded, it doesn't run code to re-render or re-load it

    return

    // const refresh_token = document.cookie
    //   .split('; ')
    //   .find((row) => row.startsWith('refresh='))
    //   ?.split('=')[1]

    // if (!refresh_token) return null

    // console.log('attempting to exchange refresh token')
    // const refreshData = await postRefreshToken({ refresh_token })

    // if (!refreshData) return null

    // setCookie({ name: 'session', value: refreshData.access_token, time: 1000 * 60 * 30 })
    // setCookie({ name: 'refresh', value: refreshData.refresh_token, time: 1000 * 60 * 60 * 12 })
  }

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
