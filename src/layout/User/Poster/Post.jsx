import React, { useState, useCallback } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Grid,
  Container,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { parseISO, formatDistanceToNow } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import { useUserProfile } from '../../../hooks/useUserProfile'
import AuthorizationAxios from '../../../hooks/Request'
import '../../../css/post.css'
import 'react-toastify/dist/ReactToastify.css'
import ShareButton from '../Components/DialogShare/ShareButton'
import MenuState from './MenuState'

const Post = ({
  bookId,
  postId,
  userId,
  userAvatar,
  userName,
  bookImg,
  bookTitle,
  bookDescription,
  bookLink,
  timeStamp,
  likes,
  state_like,
  isDetailPostPage,
  noLink,
}) => {
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
    const PostId = postId

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
  }, [liked, countLike, user, postId])

  const handleCardClick = () => {
    if (!noLink) return
    else navigate(`/detail-post/${postId}`)
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
            avatar={
              <Link
                to={
                  user && user.user.id === userId
                    ? `/my-profile`
                    : `/detail-user/${userId}`
                }
                onClick={(event) => event.stopPropagation()}
              >
                <Avatar src={userAvatar} alt="User Avatar" />
              </Link>
            }
            action={
              <IconButton
                aria-label="settings"
                onClick={(event) => event.stopPropagation()}
              >
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <Link
                to={
                  user && user.user.id === userId
                    ? `/my-profile`
                    : `/detail-user/${userId}`
                }
                style={{ textDecoration: 'none', color: 'inherit' }}
                onClick={(event) => event.stopPropagation()}
              >
                {userName}
              </Link>
            }
            subheader={timeAgo}
          />
          <CardContent className="post-content">
            <Link
              to={`/detail-book/${bookId}`}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="post-content-left">
                <a href={bookLink} target="_blank" rel="noopener noreferrer">
                  <img
                    className="book-image"
                    src={bookImg}
                    alt={bookTitle}
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                </a>
              </div>
            </Link>
            <div className="post-content-right">
              <a
                href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="book-link"
              >
                <Typography
                  variant="h6"
                  className="book-title"
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                >
                  {bookTitle}
                </Typography>
              </a>
              {isDetailPostPage || noLink === false ? (
                <MenuState
                  status={status}
                  setStatus={setStatus}
                  rating={rating}
                  setRating={setRating}
                  id_book={bookId}
                  id_user={userId}
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
                    {countLike > 0
                      ? `${countLike} người đã thích`
                      : 'Hãy thích bài viết'}
                  </Typography>
                </IconButton>
              </Grid>

              <Grid item md={4} sm={6}>
                <ShareButton fullWidth />
              </Grid>

              <Grid item md={4} sm={12}>
                <Link
                  to={`/detail-post/${postId}`}
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

export default Post
