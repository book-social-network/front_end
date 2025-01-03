import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
  Paper,
} from '@mui/material'
import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../layout/User/Components/Footer/Footer'
import { useUserProfile } from '../../hooks/useUserProfile'
import AuthorizationAxios from '../../hooks/Request'
import MyPost from '../Profile/MyPost'
import SharePostList from '../../layout/User/Poster/SharePostList'

export default function DetailUser() {
  const { id } = useParams()
  const { user: loggedInUser, token } = useUserProfile()
  const [userDetails, setUserDetails] = useState(null)
  const [post, setPost] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const resUser = await AuthorizationAxios.get(`/api/user/get/${id}`)
        setUserDetails(resUser.data)
        setPost(resUser.data.posts)
      } catch (e) {
        console.error('Error fetching user data:', e)
      }
    }

    fetchUserData()
  }, [id, loggedInUser, token])
  const handleFollow = async () => {
    try {
      if (userDetails['state-follow'] === 1) {
        await AuthorizationAxios.get(`/api/follow/unfollow/${id}`)
      } else {
        await AuthorizationAxios.get(`/api/follow/follow/${id}`)
      }
    } catch (e) {
      console.log(e)
    }
  }
  if (!userDetails || !loggedInUser) return <div>Loading...</div>
  return (
    <div>
      <section
        style={{
          backgroundColor: '#eee',
          padding: '20px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Container>
          <Grid container spacing={3} display="flex" justifyContent="center">
            <Grid item lg={4}>
              <Card>
                <CardContent style={{ textAlign: 'center' }}>
                  <Avatar
                    src={userDetails.user.image_url}
                    alt="avatar"
                    style={{ width: 150, height: 150, margin: '0 auto' }}
                  />
                  <Typography variant="h5" style={{ marginTop: '20px' }}>
                    {userDetails.user.name}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color={
                        userDetails['state-follow'] === 1 ? 'error' : 'primary'
                      }
                      onClick={handleFollow}
                    >
                      {userDetails['state-follow'] === 1
                        ? 'Unfollow'
                        : 'Follow'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={8}>
              <Card>
                <CardContent>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Full Name</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {userDetails.user.name}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Posts</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {userDetails.posts.length}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Followers</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {userDetails.followers.quantity}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Point</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {userDetails.user.point}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Date of birth</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {userDetails.user.dob}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
              <Box sx={{ marginTop: 3 }}>
                  <Paper sx={{ padding: 3, backgroundColor: '#c5e5f5' }}>
                    <SharePostList user={userDetails} />
                    <MyPost post={post}/>
                  </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
      <Footer />
    </div>
  )
}
