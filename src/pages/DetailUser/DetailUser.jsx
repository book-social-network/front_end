import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
} from '@mui/material'
import { Avatar } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../../layout/User/Components/Footer/Footer'
import { useUserProfile } from '../../hooks/useUserProfile'

export default function DetailUser() {
  const { id } = useParams()
  const { user: loggedInUser, token } = useUserProfile()
  const [userDetails, setUserDetails] = useState(null)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
  
    const fetchUserData = async () => {
      try {
        const resUser = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/user/get/${id}`
        );
        setUserDetails(resUser.data);  
        const resFollows = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/follow/get-all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const followers = resFollows.data.followers || [];
        const isUserFollowed = followers.some(
          follow => follow.user_id === loggedInUser && follow.follower === parseInt(id)
        );
        console.log(isUserFollowed);

        setIsFollowing(isUserFollowed);
      } catch (e) {
        console.error('Error fetching user data:', e);
      }
    };
  
    fetchUserData();
  }, [id, loggedInUser, token]);
  

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/follow/unfollow/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        )
      } else {
        await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/follow/follow/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        )
      }
      setIsFollowing(!isFollowing)
    } catch (e) {
      console.log(e)
    }
  }
  if (!userDetails || !loggedInUser) return <div>Loading...</div>

  return (
    <div>
      <section style={{ backgroundColor: '#eee', padding: '20px' }}>
        <Container>
          <Grid container spacing={3}>
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
                      color={isFollowing ? 'error' : 'primary'}
                      onClick={handleFollow}
                    >
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item lg={8}>
              <Card>
                <CardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Full Name</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {userDetails.user.name}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Email</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {userDetails.user.email}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Phone</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {userDetails.user.phone}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Point</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {userDetails.user.point}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2">Date of birth</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {userDetails.user.dob}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </section>
    </div>
  )
}
