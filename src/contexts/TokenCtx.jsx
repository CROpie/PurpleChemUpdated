// import React from 'react'

// export const TokenCtx = React.createContext()

// export function getSession() {
//   const session = document.cookie
//     .split('; ')
//     .find((row) => row.startsWith('session='))
//     ?.split('=')[1]

//   if (!session) {
//     console.log('attempting to exchange refresh token')
//   }

//   return session
// }

// export function TokenCtxProvider({ children }) {
//   function setCookie({ name, value, time }) {
//     const expires = new Date()
//     expires.setTime(expires.getTime() + time)
//     document.cookie = `${name}=${value}; expires=${expires.toUTCString()}`
//   }

//   function deleteCookie({ name }) {
//     setCookie({ name, value: '', time: 0 })
//   }

//   function logIn({ data }) {
//     setCookie({ name: 'session', value: data.access_token, time: 1000 * 60 * 30 })
//     setCookie({ name: 'refresh', value: data.refresh_token, time: 1000 * 60 * 60 * 12 })
//   }

//   function logOut() {
//     deleteCookie({ name: 'session' })
//     deleteCookie({ name: 'refresh' })
//   }

//   return (
//     <TokenCtx.Provider value={{ JWT, getSession, logIn, logOut }}>{children}</TokenCtx.Provider>
//   )
// }
