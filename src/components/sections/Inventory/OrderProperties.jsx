import React from 'react'
import styled from 'styled-components'

export default function OrderProperties({ order, structure }) {
  return (
    <List>
      <Structure>
        <li dangerouslySetInnerHTML={{ __html: structure }} />
      </Structure>
      <li>CAS: {order.chemical.CAS}</li>
      <li>MW: {order.chemical.MW}</li>
      <li>MP: {order.chemical.MP}</li>
      <li>BP: {order.chemical.BP}</li>
      <li>Density: {order.chemical.density}</li>
    </List>
  )
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: var(--shadow-2);
  padding: 1rem 0.5rem;
  border-radius: var(--borderRadius);
  background: var(--backgroundWhite);
  color: var(--text-color);
`

const Structure = styled.div`
  display: grid;
  place-items: center;
`

// FOR EXAMPLE:

/*
    "chemical_id": 21,
    "supplier_id": 1,
    "amount": 0,
    "amountUnit": "mL",
    "supplierPN": "319953",
    "id": 23,
    "user_id": 1,
    "user": {
        "id": 1,
        "username": "admin@purplechem.com",
        "full_name": "administrator"
    },
    "chemical": {
        "CAS": "71-43-2",
        "chemicalName": "Benzene",
        "MW": "78.11",
        "MP": "5.5 °C",
        "BP": "80.1 °C",
        "density": "0.8787 g/cm³ @ Temp: 15 °C",
        "smile": "C=1C=CC=CC1",
        "inchi": "InChI=1S/C6H6/c1-2-4-6-5-3-1/h1-6H",
        "id": 21
    },
    "supplier": {
        "supplierName": "Sigma-Aldrich",
        "id": 1
    },
    "location_id": 1,
    "location": {
        "locationName": "Solvent Cupboard",
        "id": 1
    },
    "status": "received",
    "isConsumed": true,
    "orderDate": "2023-08-27T11:23:56"
}
*/
