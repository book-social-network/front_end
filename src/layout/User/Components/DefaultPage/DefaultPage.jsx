import React from 'react'
import Header from '../Header/Header'
import { UserProvider } from '../../../../hooks/UseContext'

export const DefaultPage = ({ children }) => {
  return (
    <UserProvider>
      <div>
        <Header />
        {children}
      </div>
    </UserProvider>
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
        backgroundColor: '#F4F1EA',
        overflowY: 'auto',
        padding: '20px',
      }}
    >
      {children}
    </div>
  )
}
