import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import { Facebook, Twitter, Instagram, Edit } from '@mui/icons-material'

export default function Profile() {
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  useEffect(() => {
    setToken(localStorage.getItem('access_token'))
    const getUser = async () => {
      try {
        const respon = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/auth/user-profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setUser(respon.data)
        console.log(respon.data)
      } catch (e) {
        console.log(e)
      }
    }
    if (token === localStorage.getItem('access_token')) {
      getUser()
    }
  }, [token])

  console.log(localStorage.getItem('access_token'))

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
                  }}
                >
                  <Avatar
                    alt="Avatar"
                    src={user ? user.image_url : ''}
                    sx={{ width: 80, height: 80, mb: 2 }}
                  />
                  <Typography variant="h5">{user ? user.name : ''}</Typography>
                  <Typography variant="body2">Web Designer</Typography>
                  <IconButton sx={{ color: '#fff', mt: 2 }}>
                    <Edit />
                  </IconButton>
                </Grid>
                <Grid item md={8}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6">Information</Typography>
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
                    <Box
                      sx={{ display: 'flex', justifyContent: 'start', mt: 2 }}
                    >
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
    </section>
  )
}
