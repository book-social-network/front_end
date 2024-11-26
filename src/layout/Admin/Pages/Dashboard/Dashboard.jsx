import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import BlockReview from '../../Components/BlockReview/BlockReview'
import AuthorizationAxios from '../../../../hooks/Request'

export default function Dashboard({ data }) {
  const [totalView, setTotalView] = useState(0)

  // Fetch the total views when the component mounts
  useEffect(() => {
    const fetchTotalView = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/view/total-views')
        setTotalView(res?.data)
      } catch (error) {
        console.error('Error fetching total views:', error)
      }
    }

    fetchTotalView()
  }, []) // Empty dependency array means this will run once on mount

  if (!data || typeof data !== 'object') {
    return (
      <Typography variant="h6" color="error" align="center" sx={{ mt: 4 }}>
        No data available
      </Typography>
    )
  }

  return (
    <div>
      <Typography
        variant="h4"
        color="#00635d"
        fontWeight="bold"
        align="center"
        sx={{ mt: 3 }}
      >
        Dashboard
      </Typography>
      <hr />
      <Typography
        variant="subtitle1"
        color="#00635d"
        align="left"
        sx={{ mb: 2 }}
      >
        Overview
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          {Object.entries(data).map(([key, value]) => (
            <Grid item xs={12} sm={6} md={4} key={key}>
              <BlockReview text={key} num={value} color="#5856d5" />
            </Grid>
          ))}
        </Grid>
      </Box>

      <hr />

      <Typography variant="h6" color="#00635d" align="start">
        Total Views: {totalView.total_views}
      </Typography>
    </div>
  )
}
