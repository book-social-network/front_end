import { Container, Grid, Card, CardContent, Typography, Button, List, ListItem, ListItemText, Divider, LinearProgress } from '@mui/material';
import { Avatar } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GitHub, Twitter, Instagram, Facebook, Language } from '@mui/icons-material';
export default function DetailUser() {
  const { id } = useParams()
  const [user, setUser] = useState(id)
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/user/get/${id}`,
        )
        setUser(res.data)
      } catch (e) {
        console.log(e)
      }
    }
    getdata()
  }, [id])
  return (
    <div>
      <section style={{ backgroundColor: '#eee', padding: '20px' }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={4}>
              <Card>
                <CardContent style={{ textAlign: 'center' }}>
                  <Avatar
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    style={{ width: 150, height: 150, margin: '0 auto' }}
                  />
                  <Typography variant="h5" style={{ marginTop: '20px' }}>
                    John Smith
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Full Stack Developer
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginBottom: '20px' }}
                  >
                    Bay Area, San Francisco, CA
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary">
                      Follow
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card style={{ marginTop: '20px' }}>
                <CardContent>
                  <List>
                    <ListItem>
                      <Language color="warning" />
                      <ListItemText primary="https://mdbootstrap.com" />
                    </ListItem>
                    <ListItem>
                      <GitHub />
                      <ListItemText primary="mdbootstrap" />
                    </ListItem>
                    <ListItem>
                      <Twitter style={{ color: '#55acee' }} />
                      <ListItemText primary="@mdbootstrap" />
                    </ListItem>
                    <ListItem>
                      <Instagram style={{ color: '#ac2bac' }} />
                      <ListItemText primary="mdbootstrap" />
                    </ListItem>
                    <ListItem>
                      <Facebook style={{ color: '#3b5998' }} />
                      <ListItemText primary="mdbootstrap" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Right Column */}
            <Grid item lg={8}>
              <Card>
                <CardContent>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Full Name</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Johnatan Smith
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Email</Typography>
                    <Typography variant="body2" color="textSecondary">
                      example@example.com
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Phone</Typography>
                    <Typography variant="body2" color="textSecondary">
                      (097) 234-5678
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Mobile</Typography>
                    <Typography variant="body2" color="textSecondary">
                      (098) 765-4321
                    </Typography>
                  </div>
                  <Divider style={{ margin: '10px 0' }} />
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body2">Address</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Bay Area, San Francisco, CA
                    </Typography>
                  </div>
                </CardContent>
              </Card>

              {/* Project Status */}
              <Grid container spacing={3} style={{ marginTop: '20px' }}>
                <Grid item md={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="body1" color="primary">
                        Project Status
                      </Typography>
                      <Typography
                        variant="body2"
                        style={{ fontSize: '.77rem' }}
                      >
                        Web Design
                      </Typography>
                      <LinearProgress variant="determinate" value={80} />
                      <Typography
                        variant="body2"
                        style={{ fontSize: '.77rem', marginTop: '10px' }}
                      >
                        Website Markup
                      </Typography>
                      <LinearProgress variant="determinate" value={72} />
                      <Typography
                        variant="body2"
                        style={{ fontSize: '.77rem', marginTop: '10px' }}
                      >
                        One Page
                      </Typography>
                      <LinearProgress variant="determinate" value={89} />
                      <Typography
                        variant="body2"
                        style={{ fontSize: '.77rem', marginTop: '10px' }}
                      >
                        Mobile Template
                      </Typography>
                      <LinearProgress variant="determinate" value={55} />
                      <Typography
                        variant="body2"
                        style={{ fontSize: '.77rem', marginTop: '10px' }}
                      >
                        Backend API
                      </Typography>
                      <LinearProgress variant="determinate" value={66} />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
      );
    </div>
  )
}
