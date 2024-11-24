import React, { useState, useRef, useEffect } from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
  Fab,
} from '@mui/material'
import { green } from '@mui/material/colors'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CheckIcon from '@mui/icons-material/Check'
import SaveIcon from '@mui/icons-material/Save'
import AuthorizationAxios from '../../hooks/Request'

const ModalEditAvatar = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  }

  useEffect(() => {
    return () => {
      if (loading) setLoading(false)
    }
  }, [loading])

  const handleUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setSuccess(false)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      await AuthorizationAxios.post('/api/user/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setSuccess(true)
      toast.success('Ảnh đại diện đã được cập nhật!')
      setLoading(false)

      onClose()
    } catch (error) {
      setLoading(false)
      toast.error('Đã xảy ra lỗi khi tải ảnh. Vui lòng thử lại.')
    }
  }

  const handleRemoveImage = async () => {
    try {
      setLoading(true)
      await AuthorizationAxios.post('/api/user/update', { image: null })
      toast.success('Ảnh đại diện đã được gỡ!')
      setLoading(false)
      onClose()
    } catch (error) {
      setLoading(false)
      toast.error('Đã xảy ra lỗi khi gỡ ảnh.')
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 2, fontWeight: 'bold' }}
        >
          Thay đổi ảnh đại diện
        </Typography>
        <label htmlFor="upload-image" style={{ display: 'block' }}>
          <input
            id="upload-image"
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleUpload}
          />
          <Button
            fullWidth
            variant="text"
            sx={{ color: 'blue', mb: 1 }}
            component="span"
          >
            Tải ảnh lên
          </Button>
        </label>
        <Button
          fullWidth
          variant="text"
          sx={{ color: 'red', mb: 1 }}
          onClick={handleRemoveImage}
        >
          Gỡ ảnh hiện tại
        </Button>
        <Button
          fullWidth
          variant="text"
          onClick={onClose}
          sx={{ color: 'gray' }}
        >
          Hủy
        </Button>

        {/* Loading and success indicator */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
        >
          <Box sx={{ m: 1, position: 'relative' }}>
            <Fab
              aria-label="save"
              color="primary"
              sx={buttonSx}
              disabled={loading}
            >
              {success ? <CheckIcon /> : <SaveIcon />}
            </Fab>
            {loading && (
              <CircularProgress
                size={68}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: -6,
                  left: -6,
                  zIndex: 1,
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalEditAvatar
