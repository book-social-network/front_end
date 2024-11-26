import { useQuery } from '@tanstack/react-query'
import AuthorizationAxios from './Request'

export const useUserProfile = () => {
  const initialValue = {}

  const {
    isLoading,
    error,
    data = initialValue,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await AuthorizationAxios.get('/api/auth/user-profile')
        return response
      } catch (err) {
        if (err.response?.status === 401) {
          const refreshResponse = await AuthorizationAxios.post(
            '/api/auth/refresh',
          )
          localStorage.setItem(
            'access_token',
            refreshResponse.data.access_token,
          )

          return AuthorizationAxios.get('/api/auth/user-profile')
        }
        throw err
      }
    },
  })

  return {
    user: data?.data,
    isLoading,
    error,
  }
}
