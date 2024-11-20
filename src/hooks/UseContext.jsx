import React, { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'

// Create UserContext to manage the user token
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
  const refreshToken = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/auth/refresh`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const newToken = response.data.access_token
      localStorage.setItem('access_token', newToken)
      setToken(newToken)
    } catch (error) {
      console.error('Error refreshing token:', error)
    }
  }

  useEffect(() => {
    if (token) {
      // Optionally, you could call refreshToken or any other function when token changes
      console.log('Token updated:', token)
    }
  }, [token])

  return (
    <UserContext.Provider value={{ token, setToken }}>
      {children}
    </UserContext.Provider>
  )
}
