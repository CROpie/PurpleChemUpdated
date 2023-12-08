import React from 'react'

export const TokenCtx = React.createContext()

export function TokenCtxProvider({ children }) {
  const [JWT, setJWT] = React.useState(() => {
    let storedJWT = window.localStorage.getItem('access-token')
    return storedJWT || null
  })

  React.useEffect(() => {
    if (!JWT) return
    window.localStorage.setItem('access-token', JWT)
  }, [JWT])

  return <TokenCtx.Provider value={{ JWT, setJWT }}>{children}</TokenCtx.Provider>
}
