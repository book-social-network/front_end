import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import { useUserProfile } from '../../hooks/useUserProfile'
import ModalInviteItem from './ModalInviteItem'

export default function ModalInvite({ openModal, closeModal, id_group }) {
  const [friends, setFriends] = useState([])
  const { user } = useUserProfile()

  useEffect(() => {
    setFriends(user?.following?.user || []) 
  }, [user])
  

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
        }}
      >
        <Typography variant="h6" component="h2" mb={2}>
          Mời bạn bè vào nhóm
        </Typography>

        <Box
          sx={{
            maxHeight: '300px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '8px',
          }}
        >
          {friends.length > 0 ? (
            friends.map((item, index) => (
              <ModalInviteItem
                key={index}
                user_avatar={item?.image_url}
                user_id={item?.id}
                user_name={item?.name}
                group_id={id_group}
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Bạn chưa theo dõi bạn bè nào để mời.
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={closeModal}
          sx={{ mt: 2 }}
        >
          Đóng
        </Button>
      </Box>
    </Modal>
  )
}
