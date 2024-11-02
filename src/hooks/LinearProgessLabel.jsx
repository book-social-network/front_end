import React from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'

const LinearProgessLabel = ({ full, completed }) => {
  const percent = (completed / full) * 100
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={percent} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(percent)}%`}
        </Typography>
      </Box>
    </Box>
  )
}
export default LinearProgessLabel
