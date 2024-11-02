import React from 'react'
import Banner from '../../../../assets/banners/banner_center.jpg'
import { Box, Typography, IconButton, Grid } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import '../../../../css/centerContainer.css'

const CenterContainer = ({ children }) => {
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
          Mừng tháng đọc sách
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          Khám phá những cuốn sách mới tuyệt vời để đọc trong tháng này và cả
          năm!
        </Typography>
      </Box>
      <Grid container sx={{ marginTop: '20px' }}>
        <Grid item xs={6} container justifyContent="flex-start">
          <Typography variant="body2">UPDATES</Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <IconButton>
            <SettingsIcon />
            <Typography variant="body2">Customize</Typography>
          </IconButton>
        </Grid>
      </Grid>
      {children}
    </>
  )
}

export default CenterContainer
