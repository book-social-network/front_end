import React, { createContext, useState, useContext } from 'react'

export const UserContext = createContext({
  token: '',
  setToken: function () {},
})

export const useUserContext = () => {
  const context = useContext(UserContext)
  return context
}

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('access_token') || '')
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  )
}
