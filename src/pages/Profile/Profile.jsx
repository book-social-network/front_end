import React, { useState, useEffect } from 'react'
import {
  Container,
  Avatar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
  Paper,
  Grid,
} from '@mui/material'
import { useUserProfile } from '../../hooks/useUserProfile'
import { Edit } from '@mui/icons-material'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link } from 'react-router-dom'
import ModalChangePass from './ModalChangePass'
import MyPost from './MyPost'
import SharePostList from '../../layout/User/Poster/SharePostList'
import ModalFollowing from './ModalFollowing'
import ModalFollower from './ModalFollower'

export default function Profile() {
  const { user } = useUserProfile()
  const [state, setState] = useState('post')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalFollower, setModalFollower] = useState(false)
  const [modalFollowing, setModalFollowing] = useState(false)
  const [post, setPost] = useState([])
  console.log(user);

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)
  const handleOpenModalFollower = () => setModalFollower(true)
  const handleCloseModalFollower = () => setModalFollower(false)
  const handleOpenModalFollowing = () => setModalFollowing(true)
  const handleCloseModalFollowing = ()=> setModalFollowing(false)

  const handleChange = (label) => {
    setState(label)
  }

  useEffect(() => {
    if (user?.posts) {
      setPost(user.posts)
    }
  }, [user])

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#c5e5f5',
          color: '#000',
          padding: 3,
        }}
      >
        <Avatar
          alt="User Name"
          src={user?.user?.image_url || ''}
          sx={{ width: 100, height: 100, marginRight: 2 }}
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" gutterBottom>
            {user?.user?.name || 'Loading...'}
          </Typography>
          <Typography variant="body2" color="#000" sx={{ marginBottom: 1 }}>
            {user?.posts?.length || 0} posts
          </Typography>
          <Typography variant="body2" color="#000" sx={{ marginBottom: 1 }}>
            {user?.user?.point || 0} points
          </Typography>
          <Grid display="flex">
            <Grid item>
              <Typography variant="body2" color="#000" onClick={handleOpenModalFollower}>
                {user?.followers?.user?.length || 0} Followers |
              </Typography>
            </Grid>
            <Grid item paddingLeft={1}>
              <Typography variant="body2" color="#000" onClick={handleOpenModalFollowing}>
                {user?.following?.user?.length || 0} Following
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" flexDirection="column">
          <Button
            variant="contained"
            startIcon={<Edit />}
            sx={{ marginBottom: 1 }}
          >
            <Link
              to="/my-profile/edit"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              Edit Profile
            </Link>
          </Button>
          <Button
            variant="contained"
            startIcon={<SettingsIcon />}
            sx={{ marginBottom: 1 }}
            onClick={handleOpenModal}
          >
            Change password
          </Button>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={state === 'post' ? 0 : 1}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Post" onClick={() => handleChange('post')} />
          <Tab label="Shared Post" onClick={() => handleChange('sharePost')} />
        </Tabs>
      </Box>

      <Box sx={{ marginTop: 3 }}>
        {state === 'post' ? (
          <Paper sx={{ padding: 3, backgroundColor: '#c5e5f5' }}>
            <MyPost post={post} />
          </Paper>
        ) : (
          <Paper sx={{ padding: 3, backgroundColor: '#c5e5f5' }}>
            <SharePostList user={user} />
          </Paper>
        )}
      </Box>

      <ModalChangePass open={isModalOpen} close={handleCloseModal} />
    <ModalFollowing open={modalFollowing} close={handleCloseModalFollowing} following={user?.following.user}/>
    <ModalFollower open={modalFollower} close={handleCloseModalFollower} followers={user?.followers.user}/>
    </Container>
  )
}
