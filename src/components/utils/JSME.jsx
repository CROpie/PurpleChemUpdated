import React from 'react'
import styled from 'styled-components'

import { RDKitCtx } from '../../contexts/RDKitCtx'

export default function JSME({ width = 550, height = 500 }) {
  const [jsmeApplet, setJsmeApplet] = React.useState(null)

  const { RDKit } = React.useContext(RDKitCtx)

  const [smile, setSmile] = React.useState('')
  const [inchi, setInchi] = React.useState('')

  React.useEffect(() => {
    const newJsmeApplet = new JSApplet.JSME('jsme_container', `${width}px`, `${height}px`)
    // newJsmeApplet.options('newLook')
    newJsmeApplet.setMenuScale(1.5)
    newJsmeApplet.setUserInterfaceBackgroundColor('#A493C1')
    newJsmeApplet.setMolecularAreaLineWidth(2)
    newJsmeApplet.setAtomMolecularAreaFontSize(12)
    newJsmeApplet.setMolecularAreaScale(1.5)
    setJsmeApplet(newJsmeApplet)
  }, [])

  function handleClick() {
    const newSmile = jsmeApplet.smiles()
    if (!newSmile) return

    const newInchi = RDKit.get_mol(newSmile).get_inchi()
    setSmile(newSmile)
    setInchi(newInchi)
  }

  return (
    <section>
      <JSMEContainer id="jsme_container" onClick={handleClick} style={{ width: `${width}px` }} />
      <input type="hidden" name="smile" value={smile} />
      <input type="hidden" name="inchi" value={inchi} />
    </section>
  )
}

const JSMEContainer = styled.div`
  margin: 1rem auto;
`
