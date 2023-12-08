// order
// id, amount, amountUnit, isConsumed, status, supplierPN, orderDate, CAS, chemicalName, full_name, supplierName
import React from 'react'
import styled from 'styled-components'

const tableHeader = ['chemicalName', 'CAS', 'researcher', 'amount']
export default function QueryTable({ orders }) {
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
          orders?.map(({ id, chemicalName, CAS, full_name, amount, amountUnit, orderDate }) => (
            <BRow key={id}>
              <BRowData>{chemicalName}</BRowData>
              <BRowData>{CAS}</BRowData>
              <BRowData>{full_name}</BRowData>

              <BRowData>
                {amount} {amountUnit}
              </BRowData>
              {/* <BRowData>{orderDate}</BRowData> */}
            </BRow>
          ))}
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
`

const THead = styled.thead`
  color: var(--primary);
  font-size: 1.5rem;
  text-transform: uppercase;
`

const THeadData = styled.th`
  text-align: start;
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
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
`

const BRowData = styled.td`
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
`

const BRowLeft = styled.td`
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  text-align: start;
`

const BRowCenter = styled.td`
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  text-align: center;
`

const BRowRight = styled.td`
  padding: 0.5rem 1.5rem 0.5rem 1.5rem;
  text-align: end;
`
