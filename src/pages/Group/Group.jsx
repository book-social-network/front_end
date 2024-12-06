import React, { useEffect, useState } from 'react'
import '../../css/group.css'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import Footer from '../../layout/User/Components/Footer/Footer'
import RecommendedGroup from '../../hooks/RecommendedGroup'
import MyGroups from '../../layout/User/Components/MyGroups/MyGroups'
import { useUserProfile } from '../../hooks/useUserProfile'
import AuthorizationAxios from '../../hooks/Request'

export default function Group() {
  const [recommendedGroup, setRecommendedGroup] = useState(true)
  const [allGroups, setAllGroups] = useState([])
  const [joinedGroups, setJoinedGroups] = useState([])
  const [randomGroups, setRandomGroups] = useState([])
  const { user, token } = useUserProfile()
  const fetchGroupsRecommented = async () => {
    try {
      const response = await AuthorizationAxios.get('/api/group/get-all')
      setAllGroups(response?.data)
    } catch (error) {
      console.log('Error fetching groups:', error)
    }
  }
  const fetchGroupJoined = async () => {
    try {
      const response = await AuthorizationAxios.get(
        '/api/post/get-post-in-group',
      )
      setJoinedGroups(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const getRandomGroups = () => {
    if (user) {
      const notInGroup = allGroups.filter(
        (group) => !group.users.some((user1) => user1.id === user.user.id),
      )
      const shuffled = [...notInGroup].sort(() => 0.5 - Math.random())
      const sixGroup = shuffled.slice(0, 6)

      setRandomGroups(sixGroup)
    }
  }
  useEffect(() => {
    fetchGroupJoined()
  }, [recommendedGroup])

  useEffect(() => {
    fetchGroupsRecommented()
  }, [])

  useEffect(() => {
    if (allGroups.length > 0) {
      getRandomGroups()
    }
  }, [allGroups])

  return (
    <div>
      <Box>
        <Container>
          <Typography className="title" variant="h5">
            Groups
          </Typography>
          <hr />
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant={recommendedGroup === true ? 'contained' : 'outlined'}
                onClick={() => {
                  setRecommendedGroup(true)
                  getRandomGroups()
                }}
              >
                <Typography
                  variant="p"
                  className="title"
                  color={recommendedGroup === true ? '#fff' : '#00635d'}
                >
                  Recommend Groups
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant={recommendedGroup === false ? 'contained' : 'outlined'}
                onClick={() => {
                  setRecommendedGroup(false)
                }}
              >
                <Typography
                  variant="p"
                  className="title"
                  color={recommendedGroup === false ? '#fff' : '#00635d'}
                >
                  My Groups
                </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container>
            {recommendedGroup === true ? (
              <Grid container spacing={2}>
                {randomGroups.map((group) => (
                  <RecommendedGroup
                    key={group.group.id}
                    idGroup={group.group.id}
                    NameGroup={group.group.name}
                    DetailGroup={group.group.title}
                    imgGroup={group.group.image_group}
                    StateGroup={group.group.state}
                  />
                ))}
              </Grid>
            ) : (
              <Grid container spacing={2}>
                <MyGroups groups={joinedGroups} />
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </div>
  )
}
