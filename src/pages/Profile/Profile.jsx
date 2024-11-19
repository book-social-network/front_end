import React, { useState } from 'react'
import {
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Box,
  IconButton,
  Modal,
  Button,
} from '@mui/material'
import { Facebook, Twitter, Instagram, Edit } from '@mui/icons-material'
import { useUserProfile } from '../../hooks/useUserProfile'
import Footer from '../../layout/User/Components/Footer/Footer'

export default function Profile() {
  const [open, setOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const { user } = useUserProfile()

  const openModal = () => setOpen(true)
  const closeModal = () => {
    setOpen(false)
    setSelectedImage(null)
    setPreviewImage(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleSave = () => {
    if (selectedImage) {
      // Perform save action, e.g., uploading image to the server
      console.log('Image saved:', selectedImage)
      closeModal()
    }
  }

  return (
    <section style={{ backgroundColor: '#f4f5f7', minHeight: '100vh' }}>
      <Container sx={{ py: 5 }}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: '100%' }}
        >
          <Grid item lg={6} mb={4}>
            <Card sx={{ borderRadius: '.5rem' }}>
              <Grid container spacing={0}>
                <Grid
                  item
                  md={4}
                  sx={{
                    backgroundColor: '#6a1b9a',
                    color: '#fff',
                    textAlign: 'center',
                    borderTopLeftRadius: '.5rem',
                    borderBottomLeftRadius: '.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    position: 'relative',
                  }}
                >
                  <Box sx={{ position: 'relative', width: 'fit-content' }}>
                    <Avatar
                      alt="Avatar"
                      src={user ? user.user.image_url : ''}
                      sx={{
                        width: 80,
                        height: 80,
                        mb: 2,
                        borderRadius: '50%', // Ensures the avatar is round
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: '#fff',
                        color: '#6a1b9a',
                        width: 24,
                        height: 24,
                        p: 0.5,
                        '&:hover': {
                          backgroundColor: '#f0f0f0',
                        },
                      }}
                      onClick={openModal}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                  </Box>
                  <Typography variant="h5">
                    {user ? user.user.name : ''}
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6">Information</Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Email</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user ? user.user.email : ''}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Phone</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user ? user.user.phone : ''}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">
                          Date of Birth
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user ? user.user.dob : ''}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography variant="h6" sx={{ mt: 4 }}>
                      Additional Information
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Email</Typography>
                        <Typography variant="body2" color="text.secondary">
                          info@example.com
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2">Phone</Typography>
                        <Typography variant="body2" color="text.secondary">
                          123 456 789
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'start', mt: 2 }}>
                      <IconButton href="#!" color="primary">
                        <Facebook fontSize="large" />
                      </IconButton>
                      <IconButton href="#!" color="primary">
                        <Twitter fontSize="large" />
                      </IconButton>
                      <IconButton href="#!" color="primary">
                        <Instagram fontSize="large" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
      
      {/* Modal to Edit Image */}
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="edit-image-modal"
        aria-describedby="edit-image-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 600, // Max width to prevent modal from growing too wide
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Typography id="edit-image-modal" variant="h6" mb={2}>
            Edit Profile Image
          </Typography>

          <Grid container spacing={4} alignItems="center">
            {/* Old Image (Current Image) */}
            <Grid item xs={5} display="flex" justifyContent="center">
              <Box
                component="img"
                src={user ? user.user.image_url : ''}
                alt="Current Avatar"
                sx={{
                  width: 150, // Fixed size for circular avatar
                  height: 150,
                  borderRadius: '50%',
                  objectFit: 'cover', // Ensure the current image stays inside the circle
                }}
              />
            </Grid>

            {/* Arrow Icon */}
            <Grid item xs={2} display="flex" justifyContent="center">
              <Typography variant="h5" sx={{ color: '#6a1b9a' }}>
                → {/* Arrow icon or symbol */}
              </Typography>
            </Grid>

            {/* New Image (Preview Image) */}
            <Grid item xs={5} display="flex" justifyContent="center">
              {previewImage && (
                <Box
                  component="img"
                  src={previewImage}
                  alt="Preview"
                  sx={{
                    width: 150, // Fixed size for circular avatar
                    height: 150,
                    borderRadius: '50%',
                    objectFit: 'cover', // Ensure the preview image stays inside the circle
                  }}
                />
              )}
            </Grid>
          </Grid>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: '1rem', display: 'block', width: '100%' }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={closeModal} variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </section>
  )
}
