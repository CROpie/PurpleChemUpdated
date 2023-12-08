import React from 'react'
import styled from 'styled-components'

const VALID_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export default function Heading({ level, children }) {
  if (typeof level !== 'number' || level < 1 || level > 6) {
    throw new Error(`Unrecognized heading level: ${level}`)
  }

  return <StyledHeading as={`h${level}`}>{children}</StyledHeading>
}

// div is just a placeholder, as={...} will dynamically change it based on the level parameter
const StyledHeading = styled.div`
  text-align: center;
  color: var(--text-color);
`
