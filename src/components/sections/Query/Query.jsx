import React from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify'

import { useQuery } from '@tanstack/react-query'

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
  // string | structure
  const [queryType, setQueryType] = React.useState('string')
  const [queryString, setQueryString] = React.useState(null)

  function toggleQueryType() {
    queryType === 'string' ? setQueryType('structure') : setQueryType('string')
  }

  // don't want staleTime because then would have to invalidate "query" every time there is a patch
  // really not worth the effort
  const { data: orders } = useQuery({
    queryKey: ['query', queryString],
    queryFn: () => getQueryData({ queryType, queryString }),
    // staleTime: 1000 * 60 * 5,
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

const Wrapper = styled.main``

const Button = styled.button`
  ${inputBtn}
  margin-bottom: 2rem;
`
