import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import BlockReview from '../../Components/BlockReview/BlockReview'
import AuthorizationAxios from '../../../../hooks/Request'
import Chart from '../Chart/Chart'

export default function Dashboard({ data }) {
  const [totalView, setTotalView] = useState(0)
  const [newUser, setNewUser] = useState(0)
  const [newPost, setNewPost] = useState(0)
  const [newGroup, setNewGroup] = useState(0)
  const [OldUser, setOldUser] = useState(0)

  useEffect(() => {
    const fetchTotalView = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/view/total-views')
        const resNewUser = await AuthorizationAxios.get(
          '/api/user/get-all-user-new',
        )
        const resOldUser = await AuthorizationAxios.get(
          '/api/user/get-all-user-old',
        )
        const resNewPost = await AuthorizationAxios.get(
          '/api/post/get-all-post-new',
        )
        const resNewGroup = await AuthorizationAxios.get(
          '/api/group/get-all-group-new',
        )
        setTotalView(res?.data)
        setNewUser(resNewUser?.data)
        setOldUser(resOldUser?.data)
        setNewPost(resNewPost?.data)
        setNewGroup(resNewGroup?.data)
      } catch (error) {
        console.error('Error fetching total views:', error)
      }
    }

    fetchTotalView()
  }, [])

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
      <Typography
        variant="subtitle1"
        color="#00635d"
        align="left"
        sx={{ mb: 2 }}
      >
        Statistical
      </Typography>

      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={6}>
            <BlockReview
              text="New users"
              num={newUser.length}
              color="#ffb3b3"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <BlockReview
              text="New posts"
              num={newPost.length}
              color="#B0E0E6"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <BlockReview
              text="New group"
              num={newGroup.length}
              color="#B0E0E6"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <BlockReview
              text="Old users"
              num={OldUser.length}
              color="#B0E0E6"
            />
          </Grid>
        </Grid>
      </Box>
      <hr />

      <Typography variant="h6" color="#00635d" align="start">
        Total Views: {totalView.total_views}
      </Typography>
      <Chart />
    </div>
  )
}
