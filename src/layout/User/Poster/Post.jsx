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
  TextField,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import SendIcon from '@mui/icons-material/Send'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { parseISO, formatDistanceToNow } from 'date-fns'
import '../../../css/post.css'
import { Link } from 'react-router-dom'
import { useUserProfile } from '../../../hooks/useUserProfile'
import axios from 'axios'
import AuthorizationAxios from '../../../hooks/Request'

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
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const { user } = useUserProfile()

  const dateObj = timeStamp ? parseISO(timeStamp) : null
  const timeAgo = dateObj
    ? formatDistanceToNow(dateObj, { addSuffix: true })
    : 'Invalid time'

  const handleChange = (event) => setStatus(event.target.value)

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
        await axios.post(
          `${process.env.REACT_APP_BACKEND}/api/post/remove-like`,
          {
            UserId: user.user.id,
            PostId: postId,
          },
        )
      }
    } catch (e) {
      console.log(e)
    }
  }, [liked, countLike, user, postId])

  const toggleCommentSection = () => setShowComment((prev) => !prev)

  const handleCommentChange = (event) => setComment(event.target.value)

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      console.log('Comment submitted:', comment)
      alert('Comment submitted!')
      setComment('')
    }
  }

  return (
    <Card className="post-container">
      <CardHeader
        avatar={
          <Link
            to={
              user && user.user.id === userId
                ? `/my-profile/${userId}`
                : `/detail-user/${userId}`
            }
          >
            <Avatar src={userAvatar} alt="User Avatar" />
          </Link>
        }
        action={
          <IconButton aria-label="settings">
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
        </IconButton>
        <Typography variant="body2">{countLike} người đã thích</Typography>
        <IconButton onClick={toggleCommentSection}>
          <CommentIcon />
        </IconButton>
        <Typography variant="body2">Comment</Typography>
      </CardActions>
      {showComment && (
        <CardContent className="comment-section">
          <div className="comment-input-container">
            <Avatar
              src={userAvatar}
              alt="User Avatar"
              className="comment-avatar"
            />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Write a comment..."
              value={comment}
              onChange={handleCommentChange}
              className="comment-input"
              fullWidth
            />
            <IconButton
              onClick={handleCommentSubmit}
              color="primary"
              aria-label="send comment"
            >
              <SendIcon />
            </IconButton>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default Post
