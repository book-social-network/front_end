import React, { useState } from 'react'
import Banner from '../../../../assets/banners/banner_center.jpg'
import { Box, Typography, IconButton, Grid } from '@mui/material'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../css/centerContainer.css'
import ModalCreatePost from './ModalCreatePost'
import { useUserProfile } from '../../../../hooks/useUserProfile'

const CenterContainer = () => {
  const { user, token } = useUserProfile()
  return (
    <>
      <Box
        className="center-content"
        sx={{
          border: '2px solid #ccc',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <img
          src={Banner}
          alt=""
          style={{ width: '100%', borderRadius: '8px' }}
        />
        <Typography
          variant="h4"
          className="banner-title"
          sx={{ marginTop: '20px' }}
        >
          Happy reading month
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          Discover great new books to read this month and beyond year!
        </Typography>
      </Box>

      <Box
        className="center-content"
        sx={{
          border: '2px solid #ccc',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <Grid container>
          <Grid item sm={2} xs={12}>
            <img
              src={user ? user.user.image_url : ''}
              alt=""
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                maxWidth: '50px',
              }}
            />
          </Grid>
          <ModalCreatePost user={user} id_group={null} token={token} />
        </Grid>
      </Box>
      <Grid container sx={{ marginTop: '20px' }}>
        <Grid item xs={6} container justifyContent="flex-start">
          <Typography variant="body2">UPDATES</Typography>
        </Grid>
      </Grid>
    </>
  )
}

export default CenterContainer
