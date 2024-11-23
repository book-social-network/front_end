import React, { createContext, useState, useContext, useEffect } from 'react'

export const UserContext = createContext({
  token: '',
  setToken: () => {},
})

export const useUserContext = () => {
  const context = useContext(UserContext)
  return context
}

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('access_token') || '')
  useEffect(() => {
    if (token) {
      console.log('Token updated:', token)
    }
  }, [token])

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  )
}
