import { useState, useEffect } from 'react'
import AuthorizationAxios from './Request'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
export const useUserProfile = () => {
  const token = localStorage.getItem('access_token')

  const initialValue = {}
  const {
    isPending,
    error,
    data = initialValue,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => AuthorizationAxios.get('/api/auth/user-profile'),
  })
  return { user: data?.data, token }
}
