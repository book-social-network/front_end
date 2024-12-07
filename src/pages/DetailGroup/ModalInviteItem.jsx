import React, { useEffect } from 'react'
import { Grid, IconButton, Typography, Box } from '@mui/material'
import { FaPlus } from 'react-icons/fa'
import AuthorizationAxios from '../../hooks/Request'
import { useUserProfile } from '../../hooks/useUserProfile'
import Pusher from 'pusher-js'

export default function ModalInviteItem({
  user_id,
  user_name,
  user_avatar,
  group_id,
}) {
  const { user } = useUserProfile()
  useEffect(() => {
    // Kết nối tới Pusher
    const pusher = new Pusher('64940ba62e7f545bd4c8', {
      cluster: 'ap2',
    })

    // Đăng ký channel
    const channelPost = pusher.subscribe(`notifications.${user?.user.id}`)
    channelPost.bind('notification-event', (data) => {
      console.log(data)
    })
  }, [])
  const handleInvite = async () => {
    const response = await AuthorizationAxios.post(
      '/api/detail-group-user/invite',
      {
        group_id: group_id,
        user_id: user_id,
      },
    )
  }
  return (
    <Grid container alignItems="center" sx={{ marginBottom: 1 }}>
      <Grid
        item
        sm={2}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          component="img"
          src={user_avatar}
          alt={user_name}
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      </Grid>
      <Grid item sm={8}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {user_name}
        </Typography>
      </Grid>
      <Grid item sm={2} xs={3}>
        <IconButton sx={{ padding: 0 }} onClick={handleInvite}>
          <FaPlus />
        </IconButton>
      </Grid>
    </Grid>
  )
}
