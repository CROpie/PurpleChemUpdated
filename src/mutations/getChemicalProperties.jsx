import { toast } from 'react-toastify'

import { CASURL, DataURL } from '../constants'
import { getSessionWithRefresh } from '../components/utils/SessionAPI'

export async function getChemicalProperties({ CAS }) {
  const response = await fetch(`${CASURL}?cas_rn=${CAS}`)

  if (response.ok) {
    const json = await response.json()
    const phys = extractPhysicalProperties({ json })
    return makeChemicalPropertiesObj({ json, phys })
  }

  // 404: no data found for this CAS number. search own database for the chemical
  if (response.status === 404) {
    return getChemicalPropertiesFromDatabase({ CAS })
  }

  // otherwise: show generic error and stop
  toast.error(`Unable to access the database, please retry.`)
  return
}

async function getChemicalPropertiesFromDatabase({ CAS }) {
  const JWT = await getSessionWithRefresh()
  if (!JWT) return

  const response = await fetch(`${DataURL}/chemicalquery?type=CAS&query=${CAS}`, {
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
  })

  if (response.ok) {
    const json = await response.json()
    return json
  }

  toast.error(`Not found: please enter the chemical properties manually.`)
  return
}

function extractPhysicalProperties({ json }) {
  return json.experimentalProperties.reduce((acc, item) => {
    const propName = item.name.replace(/ /g, '')
    const propValue = item.property
    acc[propName] = propValue

    return acc
  }, {})
}

function makeChemicalPropertiesObj({ json, phys }) {
  return {
    CAS: json.rn,
    chemicalName: json.name,
    MW: json.molecularMass,
    inchi: json.inchi,
    smile: json.smile,
    MP: phys.MeltingPoint !== undefined ? phys.MeltingPoint : null,
    BP: phys.BoilingPoint !== undefined ? phys.BoilingPoint : null,
    density: phys.Density !== undefined ? phys.Density : null,
  }
}
