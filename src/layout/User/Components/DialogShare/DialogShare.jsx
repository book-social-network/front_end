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

export default function DialogShare({ open, onClose, id}) {
  const { user } = useUserProfile()
  const handleUpdatePoint = async() => {
    await AuthorizationAxios.post('api/user/update',{
        point: user.user.point + 1
    })
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    alert('Link copied to clipboard!')
    handleUpdatePoint()
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
            value={`/detai-post/${id}`}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <IconButton color="primary" onClick={handleCopy}>
            <Copy />
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
