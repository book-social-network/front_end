import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  TextField,
  Container,
  Menu,
  MenuItem,
  Grid,
} from '@mui/material'
import MenuState from '../layout/User/Poster/MenuState'
import ShareButton from '../layout/User/Components/DialogShare/ShareButton'
import IconToIcon from './IconToIcon'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import { parseISO, formatDistanceToNow } from 'date-fns'
import SendIcon from '@mui/icons-material/Send'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Link } from 'react-router-dom'
import AuthorizationAxios from './Request'
import { useUserProfile } from './useUserProfile'
import '../css/post.css'
import Pusher from 'pusher-js'
import { toast } from 'react-toastify'

export default function MyGroupItem({
  group_name,
  user_id,
  user_avatar,
  group_avatar,
  bookDescription,
  name_book,
  image_book,
  book_link,
  group_id,
  book_id,
  post_id,
  state_like,
  likes,
  user_name,
  timeStamp,
  noLink,
  isDetailPostPage,
}) {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [status, setStatus] = useState('Choose state')
  const [liked, setLiked] = useState(state_like)
  const [countLike, setCountLike] = useState(likes)
  const [rating, setRating] = useState(0)
  const { user } = useUserProfile()
  const navigate = useNavigate()
  const dateObj = timeStamp ? parseISO(timeStamp) : null
  const timeAgo = dateObj
    ? formatDistanceToNow(dateObj, { addSuffix: true })
    : 'Invalid time'

  const toggleLike = useCallback(async () => {
    setLiked((prevLiked) => !prevLiked)
    setCountLike((prevCount) => (liked ? prevCount - 1 : prevCount + 1))

    const UserId = user.user.id
    const PostId = post_id

    try {
      if (!liked) {
        await AuthorizationAxios.post('/api/post/insert-like', {
          post_id: PostId,
          user_id: UserId,
        })
      } else {
        await AuthorizationAxios.remove(`/api/post/delete-like/${PostId}`)
      }
    } catch (e) {
      console.log(e)
    }
  }, [liked, countLike, user, post_id])
  // Realtime
  useEffect(() => {
    // Kết nối tới Pusher
    const pusher = new Pusher('64940ba62e7f545bd4c8', {
      cluster: 'ap2',
    })

    // Đăng ký channel
    const channelPost = pusher.subscribe(`post.${post_id}`)
    channelPost.bind('like-post', (data) => {
      console.log(data)
    })
  }, [])

  const handleCardClick = () => {
    if (!noLink) return
    else navigate(`/detail-group/${group_id}`)
  }

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
  }

  const handleUpdatePost = () => {
    navigate(`/update-post/${post_id}`)
    handleMenuClose()
  }

  const handleDeletePost = async () => {
    await AuthorizationAxios.remove(`/api/post/delete/${post_id}`)
    toast.success('deleted post')
    navigate('/home')
    handleMenuClose()
  }

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        sx={{ maxWidth: '850px', margin: 'auto' }}
      >
        <Card
          className="post-container"
          onClick={handleCardClick}
          style={{ cursor: 'pointer', width: '100%' }}
        >
          <CardHeader
            avatar={<IconToIcon icon1={group_avatar} icon2={user_avatar} />}
            action={
              user_id === user.user.id ? (
                <>
                  <IconButton
                    aria-label="settings"
                    onClick={(event) => {
                      event.stopPropagation()
                      handleMenuOpen(event)
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={menuAnchorEl}
                    open={Boolean(menuAnchorEl)}
                    onClose={handleMenuClose}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <MenuItem onClick={handleUpdatePost}>Update Post</MenuItem>
                    <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
                  </Menu>
                </>
              ) : null
            }
            title={
              <Link
                to={
                  user && user.user.id === user_id
                    ? `/my-profile`
                    : `/detail-user/${user_id}`
                }
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={(event) => event.stopPropagation()}
              >
                {group_name}
              </Link>
            }
            subheader={
              <div>
                <div>{user_name}</div>
                <div>{timeAgo}</div>
              </div>
            }
          />
          <CardContent className="post-content">
            <Link
              to={`/detail-book/${book_id}`}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="post-content-left">
                <a href={book_link} target="_blank" rel="noopener noreferrer">
                  <img
                    className="book-image"
                    src={image_book}
                    alt={name_book}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </a>
              </div>
            </Link>
            <div className="post-content-right">
              <a
                href={book_link}
                target="_blank"
                rel="noopener noreferrer"
                className="book-link"
              >
                <Typography
                  variant="h6"
                  className="book-title"
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                >
                  {name_book}
                </Typography>
              </a>
              {isDetailPostPage ? (
                <MenuState
                  status={status}
                  setStatus={setStatus}
                  rating={rating}
                  setRating={setRating}
                  id_book={book_id}
                  id_user={user_id}
                />
              ) : null}
              <Typography
                variant="body2"
                className="post-description"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                {bookDescription}
              </Typography>
            </div>
          </CardContent>
          <CardActions
            className="post-actions"
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              padding: { xs: '8px 12px', sm: '12px 16px' },
            }}
          >
            <Grid container spacing={2}>
              <Grid item md={4} sm={6}>
                <IconButton onClick={toggleLike} fullWidth>
                  {liked ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                  <Typography
                    paddingLeft={1}
                    sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                  >
                    {countLike > 0 ? `${countLike} liked` : '0 liked'}
                  </Typography>
                </IconButton>
              </Grid>

              <Grid item md={4} sm={6}>
                <ShareButton fullWidth id={post_id} />
              </Grid>

              <Grid item md={4} sm={12}>
                <Link
                  to={`/detail-post/${post_id}`}
                  onClick={(event) => event.stopPropagation()}
                >
                  <IconButton fullWidth>
                    <CommentIcon />
                    <Typography paddingLeft={1}>Comment</Typography>
                  </IconButton>
                </Link>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Container>
  )
}
