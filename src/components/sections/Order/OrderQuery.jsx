import React from 'react'
import styled from 'styled-components'

import { TokenCtx } from '../../../contexts/TokenCtx'

import { formLabel, formInput, inputBtn } from '../../styles/mixins'

import { getChemicalProperties } from '../../../mutations/getChemicalProperties'
import { getCASFromChemName } from '../../../mutations/getCasFromChemName'

const CASRegexPattern = /^\d{2,7}-\d{2}-\d$/

export default function OrderQuery({
  queryRef,
  searchStatus,
  setSearchStatus,
  setChemProperties,
  setSearchStrings,
}) {
  const { JWT } = React.useContext(TokenCtx)

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(queryRef.current)
    const queryString = String(formData.get('queryString')).trim()
    console.log('queryString: ', queryString)

    if (!queryString) return

    // treat any inputted CAS number as such, and anything else as an attempted chemical name
    // searchStrings is used to pass the entered info to where it is displayed in the form (in chemicalProperties)
    if (CASRegexPattern.test(queryString)) {
      setSearchStrings({ CAS: queryString })
      searchCAS({ CAS: queryString })
      return
    }

    // try to find the CAS number from the chemical name entered
    const CAS = await getCASFromChemName({ chemicalName: queryString })
    if (CAS) {
      setSearchStrings({ chemicalName: queryString, CAS })
      searchCAS({ CAS })
    } else {
      setSearchStrings({ chemicalName: queryString })
      setSearchStatus('notFound')
    }
  }

  async function searchCAS({ CAS }) {
    // searches online CAS database, and if unsuccessful, searches purpleChem database
    // if still not found, will have to input chemical property data manually
    const data = await getChemicalProperties({ CAS, JWT })

    if (!data) {
      setSearchStatus('notFound')
      return
    }

    setSearchStatus('found')
    setChemProperties(data)
  }

  function handleReset() {
    setSearchStatus('idle')
    setChemProperties({})
  }

  return (
    <Wrapper onSubmit={handleSubmit} ref={queryRef}>
      {searchStatus === 'idle' && (
        <>
          <Label htmlFor="queryString">CAS Number (eg 110-54-3) or chemical Name </Label>
          <Input id="queryString" name="queryString" />

          <Button>Search</Button>
        </>
      )}
      {searchStatus !== 'idle' && (
        <Button type="button" onClick={handleReset}>
          Reset
        </Button>
      )}
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

const InputsWrapper = styled.div`
  display: flex;
  & > div {
    flex: 1;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
`
