import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Grid,
  Container,
  IconButton,
  Button,
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useUserProfile } from '../../hooks/useUserProfile'
import AuthorizationAxios from '../../hooks/Request'
import SuggestFriendsItem from './SuggestFriendsItem'
import Following from './Following'
import Followers from './Followers'
import { useTheme, useMediaQuery } from '@mui/material'
import DetailUser from './DetailUser'
import SearchFriends from './SearchFriends'

export default function Friends() {
  const { user } = useUserProfile()
  const [suggesFriends, setSuggesFriends] = useState([])
  const [view, setView] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedFollowerId, setSelectedFollowerId] = useState(null)
  const [followed, setFollowed] = useState(false)

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const itemsPerPage = isSmallScreen ? 2 : 4

  const fetchSuggest = async () => {
    try {
      const res = await AuthorizationAxios.get('/api/follow/suggest-friends')
      setSuggesFriends(res.data)
    } catch (error) {
      console.error('Error fetching suggested friends:', error)
    }
  }

  useEffect(() => {
    fetchSuggest()
  }, [user])

  const totalItems = suggesFriends.length
  const visibleItems = suggesFriends.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  )

  const handleNext = () => {
    if (currentIndex + itemsPerPage < totalItems) {
      setCurrentIndex(currentIndex + itemsPerPage)
    }
  }

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage)
    }
  }

  return (
    <Container>
      <Box position="relative" padding={3}>
        <SearchFriends />
      </Box>
      <Box position="relative">
        <Typography variant="h6" color="#00635d" mb={2}>
          Suggest friends
        </Typography>
        <Grid container spacing={2}>
          {visibleItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <SuggestFriendsItem
                id={item.id}
                name={item.name}
                image={item.image_url}
              />
            </Grid>
          ))}
        </Grid>

        <IconButton
          onClick={handlePrev}
          disabled={currentIndex === 0}
          sx={{
            position: 'absolute',
            left: -30,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: '#fff',
            boxShadow: 2,
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <IconButton
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= totalItems}
          sx={{
            position: 'absolute',
            right: -30,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: '#fff',
            boxShadow: 2,
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Box display="flex" justifyContent="start" margin={2} gap={2}>
        <Button
          variant={view ? 'outlined' : 'contained'}
          onClick={() => setView(false)}
        >
          Followers
        </Button>
        <Button
          variant={!view ? 'outlined' : 'contained'}
          onClick={() => setView(true)}
        >
          Following
        </Button>
      </Box>
      {console.log(user?.followers.user)}
      <Grid container spacing={2}>
        <Grid item paddingTop={2} md={4} sm={12}>
          {!view ? (
            <Followers
              followers={user?.followers.user}
              setFollower={setSelectedFollowerId}
              setFollowed={setFollowed}
            />
          ) : (
            <Following
              following={user?.following.user}
              setFollower={setSelectedFollowerId}
              setFollowed={setFollowed}
            />
          )}
        </Grid>
        <Grid item md={8} sm={12}>
          {selectedFollowerId && (
            <DetailUser id={selectedFollowerId} isFollowed={followed} />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
