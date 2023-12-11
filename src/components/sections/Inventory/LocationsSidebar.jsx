import React from 'react'
import styled from 'styled-components'
import { MOBILEBREAKPOINT } from '../../../constants'

import LocationsList from './LocationsList'
import NewLocation from './NewLocation'
import { inputBtn } from '../../styles/mixins'

export default function LocationsSidebar({ locations, selectedLocation, setSelectedLocation }) {
  const [showNewLocation, setShowNewLocation] = React.useState(false)

  return (
    <Wrapper>
      <LocationsList
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      {showNewLocation && <NewLocation setShowNewLocation={setShowNewLocation} />}
      <Button type="button" onClick={() => setShowNewLocation(!showNewLocation)}>
        {showNewLocation ? 'Hide' : 'Add New Location'}
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.section``

const Button = styled.button`
  ${inputBtn}
  @media (${MOBILEBREAKPOINT}) {
    font-size: 1rem;
    padding-block: 4px;
    margin-top: 4px;
    margin-bottom: 0;
  }
`
