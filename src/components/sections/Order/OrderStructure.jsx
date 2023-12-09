import React from 'react'
import styled from 'styled-components'

import JSME from '../../utils/JSME'
import { RDKitCtx } from '../../../contexts/RDKitCtx'

export default function OrderStructure({ searchStatus, chemProperties }) {
  const { RDKit } = React.useContext(RDKitCtx)
  const [structure, setStructure] = React.useState('')

  React.useEffect(() => {
    if (searchStatus === 'found') {
      setStructure(RDKit.get_mol(chemProperties.smile).get_svg())
    }
  }, [])

  return (
    <Wrapper>
      {searchStatus === 'notFound' && <JSME width="400" height="400" menuScale="1" />}
      {searchStatus === 'found' && <div dangerouslySetInnerHTML={{ __html: structure }} />}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  place-items: center;
`
