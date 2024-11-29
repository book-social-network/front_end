import React, { useEffect, useState } from 'react'
import { Modal, Box, Typography, Button } from '@mui/material'
import { useUserProfile } from '../../hooks/useUserProfile'
import ModalInviteItem from './ModalInviteItem'
import ModalDeleteUserItem from './ModalDeleteUserItem'

export default function ModalDelete({
  openModal,
  closeModal,
  users = [],
  id_group,
}) {
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
          Thành viên
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
          {users && users.length > 0 ? (
            users.map((item, index) => (
              <ModalDeleteUserItem
                key={index}
                group_id={id_group}
                user_avatar={item?.user.image_url}
                user_name={item?.user.name}
                user_id={item?.user.id}
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Không có thành viên nào trong nhóm.
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
