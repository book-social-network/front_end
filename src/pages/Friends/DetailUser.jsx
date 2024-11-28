import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, CardContent, Container, Divider, Grid, Typography } from '@mui/material'
import AuthorizationAxios from '../../hooks/Request'
import { toast } from 'react-toastify'

export default function DetailUser({ id, isFollowed }) {
  const [user, setUser] = useState(null)
  const fetchData = async () => {
    const res = await AuthorizationAxios.get(`/api/user/get/${id}`)
    const resData = await res?.data
    setUser(resData)
  }
  useEffect(() => {
    fetchData()
  }, [id])
  console.log(isFollowed);
  const handleFollow = async()=>{
    if(isFollowed){
        const res = await AuthorizationAxios.get(`/api/follow/follow/${id}`)
        console.log(res);
        toast.success(`You follow ${user.user.name}`)
    }else{
        const resp = await AuthorizationAxios.get(`/api/follow/unfollow/${id}`)
        toast.warn(`You unfollow ${user.user.name}`)
    }
  }
  return (
    <div>
      <section style={{ backgroundColor: '#eee', padding: '20px' }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={4}>
              <Card>
                <CardContent style={{ textAlign: 'center' }}>
                  <Avatar
                    src={user?.user.image_url}
                    alt="avatar"
                    style={{ width: 150, height: 150, margin: '0 auto' }}
                  />
                  <Typography variant="h5" style={{ marginTop: '20px' }}>
                    {user?.user.name}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color={!isFollowed ? 'error' : 'primary'}
                      onClick={handleFollow}
                    >
                      {!isFollowed ? 'Unfollow' : 'Follow'}
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
                      {user?.user.name}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Email</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user?.user.email}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Phone</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user?.user.phone}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Point</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user?.user.point}
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Date of birth</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user?.user.dob}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  )
}
