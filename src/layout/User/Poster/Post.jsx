import React, { useState } from 'react'
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
import { formatDistanceToNow } from 'date-fns'
import '../../../css/post.css'

const Post = ({
  userAvatar,
  userName,
  bookImg,
  bookTitle,
  bookDescription,
  bookLink,
  timeStamp,
}) => {
  const [status, setStatus] = useState('Want to Read')
  const [liked, setLiked] = useState(false)
  const [countLike, setCountLike] = useState(0)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)

  const handleChange = (event) => {
    setStatus(event.target.value)
  }

  const toggleLike = () => {
    if (liked) {
      setCountLike(countLike - 1)
    } else {
      setCountLike(countLike + 1)
    }
    setLiked(!liked)
  }

  const toggleCommentSection = () => {
    setShowComment(!showComment)
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      console.log('Comment submitted:', comment)
      setComment('')
    }
  }
  const timeParts = timeStamp.split(' ')
  const formattedTimeStamp = `${timeParts[0]}T${timeParts[1]}`
  const dateObject = new Date(formattedTimeStamp)
  const timeAgo = formatDistanceToNow(dateObject, { addSuffix: true })

  return (
    <Card className="post-container">
      <CardHeader
        avatar={<Avatar src={userAvatar} alt="User Avatar" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={userName}
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

          {/* Conditionally render the rating section based on status */}
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
        <Typography variant="body2" onClick={toggleLike}>
          {countLike}
        </Typography>
        <IconButton onClick={toggleCommentSection}>
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" onClick={toggleCommentSection}>
          Comment
        </Typography>
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
