import { useQuery } from '@tanstack/react-query'
import AuthorizationAxios from './Request'
import { useNavigate } from 'react-router-dom'

export const useUserProfile = () => {
  const initialValue = {}
  const navigate = useNavigate()

  const {
    isLoading,
    error,
    isError,
    data = initialValue,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await AuthorizationAxios.get('/api/auth/user-profile')
        return response
      } catch (err) {
        throw err
      }
    },
  })

  if(isError)
  {
    if(error.message === `["user"] data is undefined`)
      navigate('/')
      localStorage.removeItem('access_token')
  }

  return {
    user: data?.data,
    isLoading,
    error,
  }
}
