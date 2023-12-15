import React from 'react'
import styled from 'styled-components'
import Icon from '../icons/Icon'
import DOMPurify from 'dompurify'

import { modalSVGs } from '../modalSVGs/modalSVGs'

const headings = [
  'Order Chemical',
  'Order Chemical',
  'Order Chemical',
  'Inventory',
  'Inventory',
  'Inventory',
  'Query',
  'Query',
  'Query',
  'Admin',
]
const texts = [
  'To "order" a chemical, start by entering the chemical name or its unique CAS reference number. (CAS numbers are used by chemists as a convenient way to refer to chemicals, as chemical names can become quite long and complicated!)',
  'If found, the chemical properties will be extracted from either an online database or the PurpleChem database. Failing that, the structure and other properties may be inputted manually.',
  'Other essential details are inputted, then the order is placed (put into the database) with the status "submitted". Administrators (lab supervisors, suppliers etc) would change this status to "ordered" then "received".',
  'Orders that you have placed can be accessed in your own personal Inventory page.',
  'Clicking on an order displays their properties for easy reference, and allows updating of the amount remaining after use and current location. Setting the amount remaining to 0 will flag the chemical as "consumed", and it will be removed from the inventory. Orders with an asterisk next to their name have not been placed in a location.',
  'Organise your chemicals to match where they are stored in the lab by adding Locations to the location sidebar. Clicking on a location will filter the inventory to that location. ',
  'Use the Query page to search the entire laboratory database for ordered chemicals. Chemical Names, CAS reference numbers or user names can be entered as strings. An empty string will return every entry in the database.',
  'Alternatively, you can draw the structure using the JSME applet if you know the structure but not the name.',
  'Hits are provided table format, allowing users to find co-workers who have previously ordered a chemical that they may want to borrow. Consumed chemicals appear by default.',
  'Certain features like adding users and suppliers, and modifying entries in the database, are only available to administrators, via the admin page.',
]

export default function IntroModal({ handleCloseModal }) {
  const [modalIndex, setModalIndex] = React.useState(0)

  function handleClickArrow(direction) {
    let tempIndex = modalIndex

    if (direction === 'next') tempIndex += 1
    if (direction === 'prev') tempIndex -= 1

    if (tempIndex === modalSVGs.length) tempIndex = 0
    if (tempIndex === -1) tempIndex = modalSVGs.length - 1

    setModalIndex(tempIndex)
  }

  return (
    <ModalBackground>
      <Modal>
        <ModalHeadingH2>{`${modalIndex + 1}: ${headings[modalIndex]}`}</ModalHeadingH2>
        <ModalText>{texts[modalIndex]}</ModalText>
        <ModalImageContainer>
          <div dangerouslySetInnerHTML={{ __html: modalSVGs[modalIndex] }} />
          {/* <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(modalSVGs[modalIndex]) }} /> */}
        </ModalImageContainer>

        <ModalButtonsContainer>
          <Button onClick={() => handleClickArrow('prev')}>
            <Icon id="ArrowLeft" />
          </Button>

          <ModalCloseButton onClick={handleCloseModal}>Ok, Got it!</ModalCloseButton>

          <Button onClick={() => handleClickArrow('next')}>
            <Icon id="ArrowRight" />
          </Button>
        </ModalButtonsContainer>
      </Modal>
    </ModalBackground>
  )
}

const ModalBackground = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.6);
  /* display: none; */
`

const Modal = styled.div`
  padding-block: 1rem;
  padding-inline: 2rem;
  border-radius: 4px;
  width: 700px;
  height: 600px;
  background: #f8f4fa;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  /* grid-template-rows: auto auto auto 1fr auto; */
  gap: 8px;

  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
  color: black;

  border-radius: 16px;
  box-shadow: -2px 5px 5px #a507c5;
`

const ModalHeadingH1 = styled.h1`
  text-align: center;
  font-size: 2rem;
`

const ModalHeadingH2 = styled.h2`
  font-size: 1.5rem;
`

const ModalText = styled.p`
  text-align: justify;
  line-height: 1.25;
`

const ModalImageContainer = styled.div`
  display: grid;
  place-items: center;
`

const Image = styled.img``

const ModalButtonsContainer = styled.div`
  margin-top: 2rem;
  /* display: grid;
  grid-template-columns: auto auto auto; */
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > button {
    height: 48px;
    font-size: 2rem;

    cursor: pointer;
  }
`

const Button = styled.button`
  background: transparent;
  border: none;

  & > div > svg:hover {
    color: green;
  }
`

const ImagePrevButton = styled.img``

const ImageNextButton = styled.img``

const ModalCloseButton = styled.button`
  font-size: 1.5rem;
  width: auto;
  background: lightgrey;
  border: 3px solid black;
  border-radius: 4px;

  padding-inline: 16px;
  &:hover {
    background: black;
    color: white;
  }
`