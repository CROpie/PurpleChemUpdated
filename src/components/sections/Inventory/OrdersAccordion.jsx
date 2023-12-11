import React from 'react'
import styled from 'styled-components'
import { MOBILEBREAKPOINT } from '../../../constants'

import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion'

import OrderProperties from './OrderProperties'
import OrderAdjust from './OrderAdjust'
import { RDKitCtx } from '../../../contexts/RDKitCtx'

import DOMPurify from 'dompurify'

export default function OrdersAccordion({ orders, selectedLocation, locations }) {
  const [selectedItem, setSelectedItem] = React.useState()
  const [structure, setStructure] = React.useState('')

  orders = orders.filter((order) => order.isConsumed === false)

  if (selectedLocation.id !== 'all')
    orders = orders.filter((order) => order.location_id === selectedLocation.id)

  const { RDKit } = React.useContext(RDKitCtx)

  function handleClick(order) {
    const currentStructure = RDKit.get_mol(order.chemical.smile).get_svg()
    setStructure(currentStructure)
    setSelectedItem(selectedItem === order.id ? null : order.id)
  }

  return (
    <AcRoot type="single" collapsible>
      {orders.map((order) => (
        <AcItem key={order.id} value={order.id}>
          <AcHeader>
            <AcTrigger
              $isSelected={selectedItem === order.id}
              onClick={() => handleClick(order)}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(order.chemical.chemicalName) }}
            />
          </AcHeader>
          <AcContentWrapper>
            <AcContent>
              <OrderAdjust order={order} locations={locations} />
              <OrderProperties order={order} structure={structure} />
            </AcContent>
          </AcContentWrapper>
        </AcItem>
      ))}
    </AcRoot>
  )
}

const AcRoot = styled(Accordion)``

const AcItem = styled(AccordionItem)``

const AcHeader = styled(AccordionHeader)``

const AcTrigger = styled(AccordionTrigger)`
  width: 100%;
  color: var(--input-color);
  background: var(--input-backGround);
  border: var(--input-border);
  border-radius: var(--input-borderRadius);
  padding: var(--input-padding);
  font-size: var(--input-fontSize);
  outline: var(--input-outline);
  margin-top: var(--input-marginY);
  margin-bottom: var(--input-marginY);
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  font-family: var(--font);
  cursor: pointer;

  color: ${(props) => (props.$isSelected ? 'var(--input-colorHighlight)' : 'var(--input-color)')};

  &:hover {
    color: var(--input-colorHover);
    background: var(--input-backgroundHover);
  }

  @media (${MOBILEBREAKPOINT}) {
    font-size: 1rem;
    padding-block: 4px;
    margin-top: 4px;
    margin-bottom: 0;
  }
`

const AcContentWrapper = styled(AccordionContent)`
  overflow: hidden;
  margin-top: -0.5rem;

  &[data-state='open'] {
    animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  &[data-state='closed'] {
    animation: slideUp 100ms cubic-bezier(0.87, 0, 0.13, 1);
  }

  @keyframes slideDown {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes slideUp {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`

const AcContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  border: var(--input-border);
  border-top: none;

  padding: 0.5rem;
  border-bottom-right-radius: var(--input-borderRadius);
  border-bottom-left-radius: var(--input-borderRadius);

  @media (${MOBILEBREAKPOINT}) {
    grid-template-columns: 1fr;
  }
`
