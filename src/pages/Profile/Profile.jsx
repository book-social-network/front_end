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
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { useUserProfile } from '../../hooks/useUserProfile'
import Footer from '../../layout/User/Components/Footer/Footer'
import ModalInfo from './ModalInfo'

export default function Profile() {
  const { user } = useUserProfile()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={12} md={6} sm={4}>
            <Card>
              <Grid container spacing={0}>
                <Grid item>
                  <Box sx={{ position: 'relative', width: 'fit-content' }}>
                    <Avatar
                      alt="Avatar"
                      src={user ? user.user.image_url : ''}
                      sx={{
                        width: 80,
                        height: 80,
                        mb: 2,
                        borderRadius: '50%',
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item>
                  <Box>
                    <Typography variant="h5">
                      {user ? user.user.name : ''}
                    </Typography>
                  </Box>
                  <Box>
                  <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Following</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user ? user.follows.quantity : ''}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Followers</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user ? user.followers.quantity : ''}
                          </Typography>
                        </Grid>
                      </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} sm={4}></Grid>
        </Grid>
      </Container>

      {/* <section style={{ backgroundColor: '#f4f5f7', minHeight: '100vh' }}>
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
                          borderRadius: '50%',
                        }}
                      />
                    </Box>
                    <Typography variant="h5">
                      {user ? user.user.name : ''}
                    </Typography>
                  </Grid>
                  <Grid item md={8}>
                    <CardContent sx={{ p: 4 }}>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Typography variant="h6">Information</Typography>
                        </Grid>
                        <Grid item>
                          <IconButton onClick={openModal}>
                            <Edit />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Typography
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'primary.main',
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Change password
                      </Typography>
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
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Point</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user ? user.user.point : ''}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Typography variant="h6" sx={{ mt: 4 }}>
                        Additional Information
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Following</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user ? user.follows.quantity : ''}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="subtitle2">Followers</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {user ? user.followers.quantity : ''}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Footer />
        <ModalInfo open={isModalOpen} onClose={closeModal} user={user} />
      </section> */}
    </>
  )
}
