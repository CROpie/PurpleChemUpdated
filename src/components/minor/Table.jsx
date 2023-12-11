import React from 'react'
import styled from 'styled-components'
import { MOBILEBREAKPOINT } from '../../constants'

import { inputBtn } from '../styles/mixins'

export function CustomTable({ properties, data, handleDelete }) {
  //   const properties = data.length > 0 ? Object.keys(data[0]) : []

  return (
    <Table>
      <THead>
        <tr>
          {properties.map((property) => (
            <THeadData key={property}>{property}</THeadData>
          ))}
        </tr>
      </THead>
      <tbody>
        {data.map((item, index) => (
          <BRow key={index}>
            {properties.map((property) =>
              property === 'delete' ? (
                <td key={property}>
                  <DelButton onClick={() => handleDelete(item.id)}>X</DelButton>
                </td>
              ) : (
                <BRowData key={property}>{item[property]}</BRowData>
              )
            )}
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

const DelButton = styled.button`
  ${inputBtn}
  cursor: pointer;
`
