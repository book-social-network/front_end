import React, { createContext, useState, useContext, useEffect } from 'react'
import AuthorizationAxios from './Request'

export const UserContext = createContext({
  token: '',
  setToken: () => {},
  user: null,
  setUser: () => {},
})

export const useUserContext = () => {
  const context = useContext(UserContext)
  return context
}

export const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('access_token') || '')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return

      try {
        const res = await AuthorizationAxios.get('/api/auth/user-profile')
        setUser(res.data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
        setUser(null)
      }
    }

    fetchData()
  }, [token])

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
