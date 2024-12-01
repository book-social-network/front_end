import { Box, Button } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { useUserProfile } from '../../../../hooks/useUserProfile'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

const BlockJoinGroup = ({ idGroup, info, idNoti }) => {
  const { user } = useUserProfile()
  const [state, setState] = useState()
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
  const handleJoin = async () => {
    await AuthorizationAxios.post(
      `/api/detail-group-user/update-state/$${idNoti}`,
      {
        group_id: idGroup,
        user_id: user?.user.id,
      },
    )
      setState(1)
    toast.success('Bạn đã tham gia vào group')
  }
  return (
    <>
      {info && state === 1 ? (
        <Box p={1}>
          <Button
            sx={{ margin: '5px' }}
            variant="contained"
            onClick={handleJoin}
          >
            Join
          </Button>
          <Button sx={{ margin: '5px' }} variant="outlined" color="error">
            Delete
          </Button>
        </Box>
      ) : (
        <></>
      )}
    </>
  )
}

export default BlockJoinGroup
