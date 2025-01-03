import { Grid, Typography, Box } from '@mui/material'
import React from 'react'

export default function Followers({ followers, setFollower, setFollowed }) {
  const handleClick = (id) => {
    setFollower(id)
    setFollowed(true)
    console.log(setFollowed)
  }
  return (
    <Grid container spacing={2}>
      {followers && followers.length > 0 ? (
        followers.map((item, index) => (
          <Grid
            container
            item
            key={index}
            spacing={2}
            alignItems="center"
            onClick={() => handleClick(item.id)}
          >
            <Grid item sm={3}>
              <img
                src={item.image_url}
                alt={item.name}
                style={{
                  maxWidth: '60px',
                  maxHeight: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </Grid>

            <Grid item>
              <Typography variant="subtitle1">{item.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {item.email}
              </Typography>
            </Grid>
          </Grid>
        ))
      ) : (
        <Box p={2}>
          <Typography variant="body2" color="#3498db">
            You don't have any followers yet
          </Typography>
        </Box>
      )}
    </Grid>
  )
}
