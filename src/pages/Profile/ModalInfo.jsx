import React, { useState } from 'react'
import { Box, Modal, Grid, Button, Input, Typography } from '@mui/material'

export default function ModalInfo({ open, onClose, user }) {
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSave = () => {
    if (selectedImage) {
      console.log('Image saved:', selectedImage)
      onClose()
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="edit-image-modal"
      aria-describedby="edit-image-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: 600,
          width: '100%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
        }}
      >
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12} display="flex" justifyContent="center">
            <Box
              component="img"
              src={previewImage || (user ? user.user.image_url : '')}
              alt="Avatar Preview"
              sx={{
                width: 150,
                height: 150,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          </Grid>
        </Grid>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginBottom: '1rem', display: 'block', width: '100%' }}
        />
        <Grid container spacing={2} paddingBottom={2} alignItems="center">
          <Grid item sm={3}>
            <Typography>Email</Typography>
          </Grid>
          <Grid item sm={9}>
            <Input placeholder="Email" fullWidth />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
