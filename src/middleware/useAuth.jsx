import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useCheckAuth = ({ requiredRole, userRole }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (userRole && userRole !== requiredRole) {
      navigate('/')
    }
  }, [requiredRole, userRole])
}
