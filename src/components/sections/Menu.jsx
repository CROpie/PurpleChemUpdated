import React from 'react'
import styled from 'styled-components'
import { MOBILEBREAKPOINT } from '../../constants'

import { Link, useLocation, useNavigate } from 'react-router-dom'

import { logOut } from '../utils/SessionAPI'
import Hamburger from '../icons/Hamburger'

import LOGO from '../../assets/BearbeerCrop.png'
import Icon from '../icons/Icon'

const pages = ['admin', 'inventory', 'order', 'query']

function Menu({ JWT, setShowModal }) {
  const navigate = useNavigate()
  let { pathname } = useLocation()
  pathname = pathname.slice(1)

  const [selectedPage, setSelectedPage] = React.useState('')

  // ensure that the correct menu is highlighted on login as well as refresh
  React.useEffect(() => {
    setSelectedPage(pathname)
  }, [pathname])

  function handleLogOut() {
    setSelectedPage('')
    logOut()
    // toast.success('Logged out.')
    navigate('/', { replace: true })
  }

  function handleHelp() {
    setShowModal(true)
  }

  /* responsive stuff */
  const [showLinks, setShowLinks] = React.useState(false)
  const linksRef = React.useRef(null)

  const toggleLinks = () => {
    setShowLinks(!showLinks)
  }

  return (
    <Wrapper>
      <LogoBurger>
        <ImgContainer>
          <img src={LOGO} alt="beerbear" />
        </ImgContainer>
        <HamburgerContainer onClick={toggleLinks}>
          <Icon id="Hamburger" />
        </HamburgerContainer>
      </LogoBurger>
      <LinksContainer $showLinks={showLinks} $linksRef={linksRef}>
        <Links ref={linksRef}>
          {pages.map((page) => (
            <LinkList
              $isSelected={selectedPage === page}
              $JWT={JWT}
              to={page}
              key={page}
              onClick={() => setSelectedPage(page)}
            >
              {page}
            </LinkList>
          ))}

          <Hider>
            <HelpBtn onClick={handleHelp}>HELP</HelpBtn>
          </Hider>

          <Hider>
            <LogoutBtn onClick={handleLogOut}>LOG OUT</LogoutBtn>
          </Hider>
          <ReverseHider>
            <HelpBtn onClick={handleHelp}>HELP</HelpBtn>
          </ReverseHider>
        </Links>
      </LinksContainer>
      <Spacer>
        <LogoutBtn onClick={handleLogOut}>LOG OUT</LogoutBtn>
      </Spacer>
    </Wrapper>
  )
}

export default Menu

const Wrapper = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: var(--input-border);
  padding: 0.5rem 1rem;
  background: var(--backgroundWhite);
  color: var(--text-color);
  margin-bottom: 2rem;

  @media (${MOBILEBREAKPOINT}) {
    display: block;
  }
`

const Links = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;

  @media (${MOBILEBREAKPOINT}) {
    flex-direction: column;
    gap: 0.75rem;
    align-items: center;
  }
`

const LinkList = styled(Link)`
  border: none;
  font-size: 1.25rem;
  background: transparent;
  color: var(--text-color);
  text-transform: uppercase;
  text-decoration: none;

  display: block;

  &:hover {
    color: var(--primaryLight);
  }

  color: ${(props) => (props.$isSelected ? 'var(--input-colorHighlight)' : 'var(--input-color)')};

  pointer-events: ${(props) => (props.$JWT ? 'all' : 'none')};
`

const LogoutBtn = styled.button`
  font-family: var(--font);
  border: none;
  font-size: 1.25rem;
  background: transparent;
  color: red;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    color: lime;
  }
`

const HelpBtn = styled.button`
  font-family: var(--font);
  border: none;
  font-size: 1.25rem;
  background: transparent;
  color: orange;
  text-transform: capitalize;
  cursor: pointer;
  &:hover {
    color: lime;
  }
`

const ImgContainer = styled.div`
  height: 48px;
  width: 48px;

  & > img {
    height: 100%;
    width: 100%;
  }
`

/* responsive styles */
const HamburgerContainer = styled.button`
  display: none;

  @media (${MOBILEBREAKPOINT}) {
    display: block;
    height: 48px;
    width: 48px;
    border: none;
    background: transparent;
    color: lightgrey;
    cursor: pointer;

    & > svg {
      height: 100%;
      width: 100%;
    }
  }
`

const LinksContainer = styled.div`
  // couldn't use auto !important this time. Maybe because mobile last approach?
  height: auto;

  @media (${MOBILEBREAKPOINT}) {
    overflow: hidden;
    transition: 0.3s ease-in-out all;

    height: ${(props) =>
      props.$showLinks ? `${props.$linksRef.current.getBoundingClientRect().height}px` : '0px'};
  }
`

const LogoBurger = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Spacer = styled.div`
  @media (${MOBILEBREAKPOINT}) {
    display: none;
  }
`

const Hider = styled.div`
  display: none;
  @media (${MOBILEBREAKPOINT}) {
    display: block;
  }
`

const ReverseHider = styled.div`
  display: block;
  @media (${MOBILEBREAKPOINT}) {
    display: none;
  }
`
