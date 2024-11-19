import React from 'react'
import Header from '../Header/Header'
import { ContextProvider } from '../../../../hooks/UseContext'
import { ModalProvider } from '../../../../hooks/ModalContext'

export const DefaultPage = ({ children }) => {
  return (
    <ModalProvider>
      <ContextProvider>
        <div>
          <Header />
          {children}
        </div>
      </ContextProvider>
    </ModalProvider>
  )
}

export const DefaultPageNoHeader = ({ children }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f4f1ea',
        overflowY: 'auto',
        paddingBottom: '20px',
      }}
    >
      {children}
    </div>
  )
}
