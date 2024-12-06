import React, { useState, useEffect } from 'react'
import {
  Container,
  Avatar,
  Typography,
  Box,
  IconButton,
  Button,
  Tabs,
  Tab,
  Paper,
  Grid,
} from '@mui/material'
import { useUserProfile } from '../../hooks/useUserProfile'
import { Edit, CameraAlt } from '@mui/icons-material'
import Post from '../../layout/User/Poster/Post'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { user } = useUserProfile()

  useEffect(() => {
    if (user?.posts) {
      setPost(user.posts)
    }
  }, [user])

  const [post, setPost] = useState([])

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#212121',
          color: 'white',
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
          <Typography variant="body2" color="#fff" sx={{ marginBottom: 1 }}>
            {user?.posts?.length} bài post
          </Typography>
          <Grid display="flex">
            <Grid item>
              <Typography variant="body2" color="#fff">
                {user?.followers?.user?.length || 0} Followers |
              </Typography>
            </Grid>
            <Grid item paddingLeft={1}>
              <Typography variant="body2" color="#fff">
                {user?.following?.user?.length || 0} Following
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Button
            variant="contained"
            startIcon={<Edit />}
            sx={{
              marginBottom: 1,
            }}
          >
            <Link
              to="/my-profile/edit"
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              Edit Profile
            </Link>
          </Button>
        </Box>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={0}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
        >
          <Tab label="Post" />
        </Tabs>
      </Box>

      <Box sx={{ marginTop: 3 }}>
        {post.length <= 0 ? (
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Please upload a post
          </Typography>
        ) : (
          <Paper sx={{ padding: 3, backgroundColor: '#121212' }}>
            {post.map((item, index) => (
              <Post
                key={index}
                userName={user?.user.name}
                userId={user?.user.id}
                userAvatar={user?.user.image_url}
                timeStamp={item?.post.created_at}
                postId={item?.post.id}
                bookDescription={item?.books[0].name}
                bookImg={item.books[0].image}
                bookLink={item?.books[0].link_book}
                bookTitle={item?.books[0].name}
                likes={item?.likes.length}
                state_like={item['state-like']}
              />
            ))}
          </Paper>
        )}
      </Box>
    </Container>
  )
}
