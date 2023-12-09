import React from 'react'
import { ChemNameURL } from '../constants'

export async function getCASFromChemName({ chemicalName }) {
  // query AWS Lambda function that commonchemistry uses to get the CAS rn
  // it always returns status code 200, even if not found. But will give: {"count": 0, "results": []}
  let uri = `${ChemNameURL}search?q=${chemicalName}&offset=0&size=30`

  const response = await fetch(uri)

  if (!response.ok) return false

  const { count, results } = await response.json()

  // returned with status code 200 but no actual results
  if (count == 0) return false

  return results[0].rn
}
