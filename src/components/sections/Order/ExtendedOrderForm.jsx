import React from 'react'
import styled from 'styled-components'
import JSME from '../../utils/JSME'

import { formLabel, formInput } from '../../styles/mixins'

const MANUAL_PROPERTIES = [
  { label: 'Chemical Name', value: 'chemicalName' },
  { label: 'Molecular Weight', value: 'MW' },
  { label: 'Boiling Point', value: 'BP' },
  { label: 'Melting Point', value: 'MP' },
  { label: 'Density', value: 'density' },
]

export default function ExtendedOrderForm({ extendedRef }) {
  return (
    <Wrapper ref={extendedRef}>
      <JSME />
      <div>
        {MANUAL_PROPERTIES.map((property) => (
          <>
            <Label htmlFor={property.value}>{property.label}</Label>
            <Input id={property.value} name={property.value} />
          </>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  /* margin-top: '1rem'; */
`

const Label = styled.label`
  ${formLabel}
`

const Input = styled.input`
  ${formInput}
`
