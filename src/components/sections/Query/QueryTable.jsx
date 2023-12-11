// order
// id, amount, amountUnit, isConsumed, status, supplierPN, orderDate, CAS, chemicalName, full_name, supplierName
import React from 'react'
import styled from 'styled-components'
import { MOBILEBREAKPOINT } from '../../../constants'
import DOMPurify from 'dompurify'

const tableHeader = ['chemicalName', 'CAS', 'researcher', 'amount']
export default function QueryTable({ orders }) {
  orders = orders.sort((a, b) => (a.chemicalName < b.chemicalName ? -1 : 1))
  return (
    <Table>
      <THead>
        <tr>
          {tableHeader.map((header, index) => {
            return <THeadData key={index}>{header}</THeadData>
          })}
        </tr>
      </THead>
      <tbody>
        {orders.length > 0 &&
          orders?.map(
            ({ id, chemicalName, CAS, full_name, amount, amountUnit, orderDate, isConsumed }) => (
              <BRow key={id} $isConsumed={isConsumed}>
                {/* <BRowData>{chemicalName}</BRowData> */}
                <BRowData dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(chemicalName) }} />
                <BRowData>{CAS}</BRowData>
                <BRowData>{full_name}</BRowData>

                <BRowData>
                  {amount} {amountUnit}
                </BRowData>
                {/* <BRowData>{orderDate}</BRowData> */}
              </BRow>
            )
          )}
      </tbody>
    </Table>
  )
}

const Table = styled.table`
  color: var(--text-color);
  padding: 0 0.5rem;
  box-shadow: var(--shadow-2);
  border-collapse: collapse;
  border-radius: var(--borderRadius);
  width: 100%;
  margin-top: 2rem;
  table-layout: fixed;
  word-break: break-all;
  font-size: 1rem;

  @media (${MOBILEBREAKPOINT}) {
    font-size: 0.75rem;
  }
`

const THead = styled.thead`
  color: var(--primary);
  font-size: 1.5rem;
  text-transform: uppercase;

  @media (${MOBILEBREAKPOINT}) {
    font-size: 0.75rem;
  }
`

const THeadData = styled.th`
  padding: 0.5rem 1rem 0.5rem 1rem;

  @media (${MOBILEBREAKPOINT}) {
    padding-inline: 4px;
  }
`

const BRow = styled.tr`
  cursor: pointer;

  &:hover {
    color: var(--primaryLight);
  }

  &:nth-child(odd) {
    border-top: 2px solid var(--grey-900);
  }

  &:nth-child(even) {
    border-top: 2px solid var(--grey-800);
  }

  /* & > td {
    color: ${(props) => (props.$isConsumed ? 'green' : 'white')};
  } */

  color: ${(props) => (props.$isConsumed ? 'grey' : 'white')};
`

const BRowData = styled.td`
  text-align: center;
  padding: 0.5rem 1rem 0.5rem 1rem;
  @media (${MOBILEBREAKPOINT}) {
    padding-inline: 4px;
  }
`
