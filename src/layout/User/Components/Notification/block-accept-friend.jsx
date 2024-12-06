import { Box, Button } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { useEffect, useState } from 'react'

const BlockAcceptFriend = ({ id_user, idNoti }) => {
  const [state, setState] = useState()

  const handleFollow = async () => {
    try {
      await AuthorizationAxios.get(`/api/follow/follow/${id_user}`)
      await AuthorizationAxios.post(`/api/notification/update-state/${idNoti}`)
      setState(1)
    } catch (error) {
      console.error('Error following user:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await AuthorizationAxios.get(
        `/api/notification/get/${idNoti}`,
      )
      const resS = await res.data
      setState(resS.state)
    }
    fetchData()
  }, [idNoti])

  return (
    <>
      {state === 1 ? null : (
        <Box p={1}>
          <Button
            sx={{ margin: '5px' }}
            variant="contained"
            onClick={handleFollow}
          >
            Follow Again
          </Button>
        </Box>
      )}
    </>
  )
}

export default BlockAcceptFriend
