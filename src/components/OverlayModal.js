import React from 'react'
import styled from 'styled-components'

export const Overlay = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 102;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .5);
  

  ${props => props.open === true ? `
    opacity: 1;
    visibility: visible
  `: `
    opacity: 0;
    visibility: hidden;
  `}

  transition: 300ms ease;

  .message {
    margin-top: 20vh;
    color: #fff;
    font-size: 1.25rem;
  }
`

export default function OverlayModal({ children, open, onClose }) {
  return (
    <Overlay open={open} onClick={() => onClose()}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </Overlay>
  )
}
