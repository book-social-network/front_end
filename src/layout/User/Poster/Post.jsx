import React, { useState, useCallback } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Select,
  MenuItem,
  Grid,
  Container,
  Menu,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { parseISO, formatDistanceToNow } from 'date-fns'
import { Link } from 'react-router-dom'
import { useUserProfile } from '../../../hooks/useUserProfile'
import AuthorizationAxios from '../../../hooks/Request'
import '../../../css/post.css'
import 'react-toastify/dist/ReactToastify.css'
import ShareButton from '../Components/DialogShare/ShareButton'

const Post = ({
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
}) => {
  const [status, setStatus] = useState('Want to Read')
  const [liked, setLiked] = useState(state_like)
  const [countLike, setCountLike] = useState(likes)
  const [rating, setRating] = useState(0)
  const { user } = useUserProfile()

  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)

  const dateObj = timeStamp ? parseISO(timeStamp) : null
  const timeAgo = dateObj
    ? formatDistanceToNow(dateObj, { addSuffix: true })
    : 'Invalid time'

  const handleChange = (event) => setStatus(event.target.value)
  const handleShare = () => {}

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

  // Handle opening the menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // Handle closing the menu
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Handle deleting the post
  const handleDelete = async () => {
    try {
      await AuthorizationAxios.delete(`/api/post/delete/${postId}`)
      // Optionally, handle post-deletion behavior, e.g., redirect or show confirmation
    } catch (e) {
      console.log(e)
    }
    handleClose()
  }

  return (
    <Container>
      <Grid sx={{ maxWidth: '850px', margin: 'auto' }}>
        <Card className="post-container">
          <CardHeader
            avatar={
              <Link
                to={
                  user && user.user.id === userId
                    ? `/my-profile`
                    : `/detail-user/${userId}`
                }
              >
                <Avatar src={userAvatar} alt="User Avatar" />
              </Link>
            }
            action={
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            }
            title={
              <Link
                to={`/detail-user/${userId}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                {userName}
              </Link>
            }
            subheader={timeAgo}
          />
          <CardContent className="post-content">
            <div className="post-content-left">
              <a href={bookLink} target="_blank" rel="noopener noreferrer">
                <img className="book-image" src={bookImg} alt={bookTitle} />
              </a>
            </div>
            <div className="post-content-right">
              <a
                href={bookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="book-link"
              >
                <Typography variant="h6" className="book-title">
                  {bookTitle}
                </Typography>
              </a>
              <Select
                value={status}
                onChange={handleChange}
                variant="outlined"
                size="small"
                className="status-select"
              >
                <MenuItem value="">Choose state</MenuItem>
                <MenuItem value="Want to Read">Want to Read</MenuItem>
                <MenuItem value="Reading">Reading</MenuItem>
                <MenuItem value="Read">Read</MenuItem>
              </Select>
              {(status === 'Reading' || status === 'Read') && (
                <div className="rating-section">
                  <Typography variant="body2">Rate it:</Typography>
                  {Array.from({ length: 5 }, (_, index) => (
                    <IconButton
                      key={index}
                      aria-label="rate"
                      onClick={() => setRating(index + 1)}
                    >
                      {rating > index ? (
                        <StarIcon style={{ color: 'gold' }} />
                      ) : (
                        <StarBorderIcon />
                      )}
                    </IconButton>
                  ))}
                </div>
              )}
              <Typography variant="body2" className="post-description">
                {bookDescription}
              </Typography>
            </div>
          </CardContent>
          <CardActions className="post-actions">
            <IconButton onClick={toggleLike}>
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              <Typography paddingLeft={1}>
                {countLike > 0 ? countLike + ' người đã thích' : 'Hãy thích bài viết'}
              </Typography>
            </IconButton>
            <Link to={`/detail-post/${postId}`}>
              <IconButton>
                <CommentIcon />
                <Typography paddingLeft={1}>Comment</Typography>
              </IconButton>
            </Link>
            <ShareButton />
          </CardActions>
        </Card>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
      >
        <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
      </Menu>
    </Container>
  )
}

export default Post
