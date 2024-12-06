import React from 'react'
import { Box, Grid, Typography } from '@mui/material'

export default function BlockReview({ text, num, color }) {
  return (
    <Box
      sx={{
        background: `linear-gradient(145deg, ${color}, #9b8dfb)`,
        borderRadius: '16px',
        padding: '24px',
        color: '#fff',
        boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
        maxWidth: '70%',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3" fontWeight="bold">
            {num}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            fontSize="1.2rem"
            textTransform="capitalize"
          >
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
