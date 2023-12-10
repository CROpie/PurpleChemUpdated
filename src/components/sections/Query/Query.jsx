import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { getSession } from '../../utils/SessionAPI'

import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { inputBtn } from '../../styles/mixins'

import QueryString from './QueryString'
import QueryStructure from './QueryStructure'
import QueryTable from './QueryTable'

import { getQueryData } from '../../../mutations/getQueryData'

// ended up using useQuery and uncontrolled input to get this to work how I wanted
// queryClient.fetchQueries fetched the data even when it wasn't stale
// needed an uncontrolled input because only wanted to change the value of queryString on submit, which
// causes an automatic refetch since it is the queryKey value

export default function Query() {
  const navigate = useNavigate()
  const session = getSession()
  React.useEffect(() => {
    if (!session) {
      toast.error('not logged in...')
      navigate('/login')
    }
  }, [session])

  // string | structure
  const [queryType, setQueryType] = React.useState('string')
  const [queryString, setQueryString] = React.useState(null)

  function toggleQueryType() {
    queryType === 'string' ? setQueryType('structure') : setQueryType('string')
  }

  const { data: orders } = useQuery({
    queryKey: ['query', queryString],
    queryFn: () => getQueryData({ queryType, queryString }),
  })

  return (
    <Wrapper>
      <Button onClick={toggleQueryType}>
        {queryType === 'string' ? 'Show structure search' : 'Show string search'}
      </Button>

      {queryType === 'string' && <QueryString setQueryString={setQueryString} />}
      {queryType === 'structure' && <QueryStructure setQueryString={setQueryString} />}
      {orders && <QueryTable orders={orders} />}
    </Wrapper>
  )
}

const Wrapper = styled.main`
  margin-top: 2rem;
`

const Button = styled.button`
  ${inputBtn}
`
