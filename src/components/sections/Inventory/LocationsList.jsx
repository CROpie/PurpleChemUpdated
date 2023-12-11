import React from 'react'
import styled from 'styled-components'
import { inputBtn } from '../../styles/mixins'
import { MOBILEBREAKPOINT } from '../../../constants'

export default function LocationsList({ locations, selectedLocation, setSelectedLocation }) {
  return (
    <ul>
      <li key={'all'}>
        <Button
          $isSelected={selectedLocation.id === 'all'}
          onClick={() => setSelectedLocation({ id: 'all', locationName: 'all' })}
        >
          All
        </Button>
      </li>
      {locations.map(({ id, locationName }) => (
        <li key={id}>
          <Button
            $isSelected={selectedLocation.id === id}
            onClick={() => setSelectedLocation({ id, locationName })}
          >
            {locationName}
          </Button>
        </li>
      ))}
    </ul>
  )
}

const Button = styled.button`
  ${inputBtn}
  color: ${(props) => (props.$isSelected ? 'var(--input-colorHighlight)' : 'var(--input-color)')};

  @media (${MOBILEBREAKPOINT}) {
    font-size: 1rem;
    padding-block: 4px;
    margin-top: 4px;
    margin-bottom: 0;
  }
`
