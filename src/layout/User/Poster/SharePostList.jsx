import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material'
import { parseISO, formatDistanceToNow } from 'date-fns'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import AuthorizationAxios from '../../../hooks/Request'
import Post from './Post'
import ModalComment from './ModalComment'

export default function SharePostList({ user }) {
  const [data, setData] = useState({ posts: [] })
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState()

  const handleOpen = (postId) => {
    setSelectedPostId(postId)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    setSelectedPostId()
  }

  const toggleLike = async (postId) => {
    const updatedPosts = data.posts.map((post) => {
      if (post.post.id === postId) {
        const isLiked = post['state-like']
        return {
          ...post,
          'state-like': !isLiked,
          likes: isLiked
            ? post.likes.filter((like) => like.id !== user.user.id)
            : [...post.likes, { id: user.user.id }],
        }
      }
      return post
    })

    setData({ posts: updatedPosts })

    try {
      if (updatedPosts.find((post) => post.post.id === postId)['state-like']) {
        await AuthorizationAxios.post('/api/post/insert-like', {
          post_id: postId,
          user_id: user.user.id,
        })
      } else {
        await AuthorizationAxios.remove(`/api/post/delete-like/${postId}`)
      }
    } catch (e) {
      console.error('Error toggling like:', e)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AuthorizationAxios.get(
          `/api/user/get/${user?.user?.id}`,
        )
        setData(res.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    if (user?.user?.id) {
      fetchData()
    }
  }, [user])

  return (
    <div>
      {data.posts.length > 0 ? (
        data.posts.map((item, index) => {
          if (!item.share) return null

          const timeStamp = item?.post.created_at
          const dateObj = timeStamp ? parseISO(timeStamp) : null
          const timeAgo = dateObj
            ? formatDistanceToNow(dateObj, { addSuffix: true })
            : 'Invalid time'

          return (
            <Paper key={index} sx={{ margin: 2 }}>
              <Card>
                <CardHeader
                  avatar={<Avatar src={user?.user?.image_url} />}
                  title={user?.user?.name}
                  subheader={timeAgo}
                />
                <CardContent>
                  <Post
                    bookDescription={item?.share?.books[0].description}
                    bookId={item?.share?.books[0].id}
                    bookImg={item?.share.books[0].image}
                    bookLink={item?.share?.books[0].link_book}
                    bookTitle={item?.share?.books[0].title}
                    timeStamp={item?.share.post.created_at}
                    postId={item?.share?.post.id}
                    userAvatar={item?.share.user.image_url}
                    userId={item?.share.user.id}
                    userName={item?.share.user.name}
                  />
                  <Grid container spacing={2}>
                    <Grid item md={6} sm={6}>
                      <IconButton
                        fullWidth
                        onClick={() => toggleLike(item.post.id)}
                      >
                        {item['state-like'] ? (
                          <FavoriteIcon color="error" />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                        <Typography
                          paddingLeft={1}
                          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                        >
                          {item.likes.length <= 0
                            ? 'Please like post'
                            : `${item.likes.length} likes`}
                        </Typography>
                      </IconButton>
                    </Grid>

                    <Grid item md={6} sm={12}>
                      <IconButton
                        fullWidth
                        onClick={() => handleOpen(item?.post.id)}
                      >
                        <CommentIcon />
                        <Typography paddingLeft={1}>Comment</Typography>
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
                {isOpen && (
                  <ModalComment
                    open={isOpen}
                    close={handleClose}
                    postId={selectedPostId}
                  />
                )}
              </Card>
            </Paper>
          )
        })
      ) : (
        <p>No shared posts available.</p>
      )}
    </div>
  )
}
