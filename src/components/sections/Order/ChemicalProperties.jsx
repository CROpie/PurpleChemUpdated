import React from 'react'
import styled from 'styled-components'

import { formLabel, formInput } from '../../styles/mixins'

const MANUAL_PROPERTIES = [
  { label: '*CAS Number', value: 'CAS' },
  { label: '*Chemical Name', value: 'chemicalName' },
  { label: 'Molecular Weight', value: 'MW' },
  { label: 'Boiling Point', value: 'BP' },
  { label: 'Melting Point', value: 'MP' },
  { label: 'Density', value: 'density' },
]

export default function ChemicalProperties({ searchStatus, chemProperties, searchStrings }) {
  // the extra ternary is strictly for transferring the CAS or chemical name inputted as the initial query

  return (
    <Wrapper>
      {MANUAL_PROPERTIES.map((property) => (
        <div key={property.label}>
          <Label
            htmlFor={property.value}
            $isDisabled={searchStatus === 'found' || searchStrings[property.value]}
          >
            {property.label}
          </Label>
          <Input
            id={property.value}
            name={property.value}
            defaultValue={
              chemProperties[property.value]
                ? chemProperties[property.value]
                : searchStrings[property.value]
                ? searchStrings[property.value]
                : ''
            }
            $isDisabled={searchStatus === 'found' || searchStrings[property.value]}
          />
        </div>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  /* margin-top: '1rem'; */
`

const Label = styled.label`
  ${formLabel}

  pointer-events: ${(props) => (props.$isDisabled ? 'none' : 'true')};
`

const Input = styled.input`
  ${formInput}

  color: ${(props) => (props.$isDisabled ? 'grey' : 'var(--input-color)')};
  pointer-events: ${(props) => (props.$isDisabled ? 'none' : 'true')};
`
