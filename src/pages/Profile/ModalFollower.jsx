import React from 'react'
import {
  Modal,
  Typography,
  Box,
  Button,
  Tooltip,
  IconButton,
  Avatar,
  Grid,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import AuthorizationAxios from '../../hooks/Request'
import { toast } from 'react-toastify'

export default function ModalFollower({ open, close, followers }) {
  const handleUnfollow = async(followerId) => {
    await AuthorizationAxios.get(`/api/follow/unfollowing/${followerId}`)
    toast.success('Successfully unfollowed!')
      close() 
  }

  return (
    <Modal open={open} onClose={close}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Followers</Typography>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mt: 2 }}>
          {followers.length > 0 ? (
            followers.map((follower) => (
              <Box
                key={follower.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  p: 1,
                  border: '1px solid #e0e0e0',
                  borderRadius: 2,
                }}
              >
                <Grid container spacing={1} alignItems="center">
                  <Grid item>
                    <Avatar src={follower.image_url} />
                  </Grid>
                  <Grid item>
                    <Typography>{follower.name}</Typography>
                  </Grid>
                </Grid>
                <Tooltip title="Delete follow" arrow>
                  <IconButton
                    color="error"
                    onClick={() => handleUnfollow(follower.id)}
                    sx={{
                      '&:hover': {
                        bgcolor: 'rgba(255, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <PersonRemoveIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ))
          ) : (
            <Typography sx={{ textAlign: 'center', mt: 4, color: 'text.secondary' }}>
              No one is following you yet
            </Typography>
          )}
        </Box>
      </Box>
    </Modal>
  )
}
