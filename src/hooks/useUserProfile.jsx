import { useState, useEffect } from 'react'
import AuthorizationAxios from './Request'

export const useUserProfile = () => {
  const token = localStorage.getItem('access_token')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      const response = await AuthorizationAxios.get('/api/auth/user-profile')
      console.log(response);
      setUser(response.data)
    }

    if (token) {
      fetch()
    }
  }, [token])

  return { user, token }
}
