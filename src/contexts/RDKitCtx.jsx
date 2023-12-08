import React from 'react'

export const RDKitCtx = React.createContext()

export function RDKitCtxProvider({ children }) {
  const [RDKit, setRDKit] = React.useState(null)

  React.useEffect(() => {
    // async is necessary.
    async function initRDKit() {
      const initRDKitMod = await initRDKitModule()
      setRDKit(initRDKitMod)
    }
    initRDKit()
  }, [])

  return <RDKitCtx.Provider value={{ RDKit }}>{children}</RDKitCtx.Provider>
}
