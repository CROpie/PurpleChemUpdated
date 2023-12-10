import React from 'react'
import styled from 'styled-components'

import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { TokenCtx } from '../../contexts/TokenCtx'
import { toast } from 'react-toastify'

import { logOut } from '../utils/SessionAPI'

const pages = ['admin', 'inventory', 'order', 'query']

function Menu() {
  const navigate = useNavigate()
  let { pathname } = useLocation()
  pathname = pathname.slice(1)

  const [selectedPage, setSelectedPage] = React.useState(pathname)

  function handleLogOut() {
    logOut()
    toast.success('Logged out.')
    navigate('/login')
  }

  return (
    <Wrapper>
      <div>
        <h1>LOGO</h1>
      </div>
      <Links>
        {pages.map((page) => (
          <LinkList
            $isSelected={selectedPage === page}
            to={page}
            key={page}
            onClick={() => setSelectedPage(page)}
          >
            {page}
          </LinkList>
        ))}
      </Links>
      <LogoutBtn onClick={handleLogOut}>Log Out</LogoutBtn>
    </Wrapper>
  )
}

export default Menu

const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  border: var(--input-border);
  padding: 0.5rem 1rem;
  background: var(--backgroundWhite);
  color: var(--text-color);
`

const Links = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 1.5rem;
`

const LinkList = styled(Link)`
  border: none;
  font-size: 1.25rem;
  background: transparent;
  color: var(--text-color);
  text-transform: capitalize;

  &:hover {
    color: var(--primaryLight);
  }

  color: ${(props) => (props.$isSelected ? 'var(--input-colorHighlight)' : 'var(--input-color)')};
`

const LogoutBtn = styled.button`
  border: none;
  font-size: 1.25rem;
  background: transparent;
  color: var(--text-color);
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    color: lime;
  }
`

/*
  console.log('menu JWT: ', JWT)

  const navigate = useNavigate()



  // auto redirect if not logged in
  React.useEffect(() => {
    if (!JWT) navigate('/login')
  }, [JWT])
*/
