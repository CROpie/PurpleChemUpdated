import { postRefreshToken } from '../../mutations/postRefreshToken'

export function logIn({ data }) {
  // setCookie({ name: 'session', value: data.access_token, time: 1000 * 60 * 30 })
  setCookie({ name: 'session', value: data.access_token, time: 1000 * 60 * 30 })
  setCookie({ name: 'refresh', value: data.refresh_token, time: 1000 * 60 * 60 * 12 })
}

export function logOut() {
  deleteCookie({ name: 'session' })
  deleteCookie({ name: 'refresh' })
}

export function getSession() {
  const session = document.cookie
    .split('; ')
    .find((row) => row.startsWith('session='))
    ?.split('=')[1]

  if (!session) {
    // Couldn't get this to work properly. Probably need to find a new strategy.
    // getSession() is a synchronous function, but to include fetching a refresh token, it needs to be async
    // but that changes the way that getSession() needs to be implemented.

    console.log('attempting to exchange refresh token')
    return

    // const refresh_token = document.cookie
    //   .split('; ')
    //   .find((row) => row.startsWith('refresh='))
    //   ?.split('=')[1]

    // if (!refresh_token) return null

    // console.log('attempting to exchange refresh token')
    // const refreshData = await postRefreshToken({ refresh_token })

    // console.log('deleting cookie to prevent infinite loop')
    // deleteCookie({ name: 'refresh' })

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
