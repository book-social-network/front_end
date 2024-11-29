import React, { useState } from 'react'
import {
  Grid,
  IconButton,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import { MdDelete } from 'react-icons/md'
import AuthorizationAxios from '../../hooks/Request'

export default function ModalDeleteUserItem({
  user_id,
  user_name,
  user_avatar,
  group_id,
}) {
  const [openDialog, setOpenDialog] = useState(false)

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleRemove = async () => {
    try {
      const response = await AuthorizationAxios.post(
        '/api/detail-group-user/delete',
        {
          group_id: group_id,
          user_id: user_id,
        },
      )
      console.log(response)
    } catch (error) {
      console.error('Error removing member:', error)
    } finally {
      handleCloseDialog()
    }
  }

  return (
    <>
      <Grid container alignItems="center" sx={{ marginBottom: 1 }}>
        <Grid
          item
          sm={2}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
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
          <IconButton sx={{ padding: 0 }} onClick={handleOpenDialog}>
            <MdDelete /> 
          </IconButton>
        </Grid>
      </Grid>

      
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xóa thành viên</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            Bạn có chắc chắn muốn xóa {user_name} khỏi nhóm này?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Không
          </Button>
          <Button onClick={handleRemove} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
