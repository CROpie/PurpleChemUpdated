import React from 'react'
import styled from 'styled-components'
import { formLabel, formInput, inputBtn } from '../../styles/mixins'

import { CASURL, DataURL } from '../../../constants'

import { toast } from 'react-toastify'
import { TokenCtx } from '../../../contexts/TokenCtx'

export default function OrderCAS({ setNewChemical, setExtendedForm, setStatus, casRef }) {
  const { JWT } = React.useContext(TokenCtx)

  function handleSubmit(e) {
    e.preventDefault()
    console.log('??')
    const formData = new FormData(casRef.current)
    const cas = String(formData.get('cas'))
    if (!cas) return
    searchCas({ cas })
  }

  async function searchCas({ cas }) {
    setStatus('loading')
    const response = await fetch(`${CASURL}?cas_rn=${cas}`)
    if (!response.ok) {
      // 404: search database for the chemical
      if (response.status === 404) {
        searchPurpleChemDatabase('CAS', cas)
        return
      }

      // otherwise: show generic error
      toast.error(`Error (${response.statusText})`)
      setStatus('idle')
      return
    }
    const json = await response.json()

    const phys = json.experimentalProperties.reduce((acc, item) => {
      const propName = item.name.replace(/ /g, '')
      const propValue = item.property
      acc[propName] = propValue

      return acc
    }, {})

    async function searchPurpleChemDatabase(type, query) {
      const response = await fetch(`${DataURL}/chemicalquery?type=${type}&query=${query}`, {
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
      })
      if (!response.ok) {
        console.log(response)
        toast.error(`Please enter the chemical properties manually.`)
        setExtendedForm(true)
        setStatus('searched')
        return
      }
      const json = await response.json()
      const newChemical = buildNewChemical(json)
      setNewChemical(newChemical)
      toast.success('chemical properties successfully imported.')
      setStatus('searched')
    }

    const newChemical = buildNewChemical(json, phys)
    setNewChemical(newChemical)
    toast.success('chemical properties successfully imported.')
    setStatus('searched')
  }

  function buildNewChemical(json, phys = null) {
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

  return (
    <Wrapper onSubmit={handleSubmit} ref={casRef}>
      <Label htmlFor="cas">CAS (eg 110-54-3) </Label>
      <Input id="cas" name="cas" />
      <Button>Search</Button>
    </Wrapper>
  )
}

const Wrapper = styled.form`
  margin-top: '1rem';
`
const Label = styled.label`
  ${formLabel}
`

const Input = styled.input`
  ${formInput}
`

const Button = styled.button`
  ${inputBtn}
`
