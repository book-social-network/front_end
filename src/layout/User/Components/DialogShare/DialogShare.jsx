import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Box,
  Typography,
  Button,
} from '@mui/material'
import { Copy } from 'lucide-react'
import { useUserProfile } from '../../../../hooks/useUserProfile'
import AuthorizationAxios from '../../../../hooks/Request'
import { CiShare1 } from "react-icons/ci";
import { toast } from 'react-toastify'

export default function DialogShare({ open, onClose, id }) {
  const { user } = useUserProfile()
  const fullLink = `${window.location.origin}/detail-post/${id}`

  const handleUpdatePoint = async (point) => {
    await AuthorizationAxios.post('/api/user/update', {
      point: user.user.point + point,
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLink)
    toast.success('Link copied to clipboard!')
    handleUpdatePoint(1)
  }

  const handleSharePost = async()=>{
    await AuthorizationAxios.post(`/api/post/share`,{
      share_id: id,
    })
    toast.success('Share successfully')
    handleUpdatePoint(3)
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share link</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ marginBottom: 2 }}>
          Anyone who has this link will be able to view this.
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            id="link"
            variant="outlined"
            value={fullLink}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <IconButton color="primary" onClick={handleCopy}>
            <Copy />
          </IconButton>
          <IconButton color='primary' onClick={handleSharePost}>
            <CiShare1/>
          </IconButton>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
