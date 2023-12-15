import styled from 'styled-components'

import ArrowLeft from './ArrowLeft'
import ArrowRight from './ArrowRight'

const icons = {
  ArrowLeft,
  ArrowRight,
}

const Icon = ({ id, height, color, size, strokeWidth, ...delegated }) => {
  const Component = icons[id]

  if (!Component) {
    throw new Error(`No icon found for ID: ${id}`)
  }

  return (
    <Wrapper height={height} strokeWidth={strokeWidth} {...delegated}>
      <Component color={color} size={size} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: ${(p) => (p.height ? p.height : '100%')};

  & > svg {
    display: block;
    stroke-width: ${(p) => (p.strokeWidth !== undefined ? p.strokeWidth + 'px' : undefined)};
  }
`

export default Icon
