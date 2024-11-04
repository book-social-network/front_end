import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  TextField,
} from '@mui/material'
import IconToIcon from './IconToIcon'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import SendIcon from '@mui/icons-material/Send'
import MoreVertIcon from '@mui/icons-material/MoreVert'
// import { formatDistanceToNow } from 'date-fns'
import '../css/post.css'
import Image from '../assets/images/MeoAnhLongNgan.webp'

export default function CatPost() {
  const [countLike, setCountLike] = useState(10)
  const [liked, setLiked] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')

  const toggleLike = () => {
    if (!liked) {
      setCountLike(countLike + 1)
    } else {
      setCountLike(countLike - 1)
    }
    setLiked(!liked)
  }
  const toggleShowComment = () => {
    setShowComment(!showComment)
  }
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      console.log('Comment submitted:', comment)
      setComment('')
    }
  }
  return (
    <Card className="post-container">
      <CardHeader
        avatar={<IconToIcon icon1={Image} icon2={Image} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Đảo mèo"
        subheader="Mèo rừng châu phi"
      />
      <CardContent className="post-content">
        <div className="post-content-left">
          <a href="{bookLink}" target="_blank" rel="noopener noreferrer">
            <img className="book-image" src={Image} alt="{bookTitle}" />
          </a>
        </div>
        <div className="post-content-right">
          <a
            href="{bookLink}"
            target="_blank"
            rel="noopener noreferrer"
            className="book-link"
          >
            <Typography variant="h6" className="book-title">
              bookTitle
            </Typography>
          </a>
          <Typography variant="body2" className="post-description">
            bookDescription
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
        <IconButton onClick={toggleShowComment}>
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" onClick={toggleShowComment}>
          Comment
        </Typography>
      </CardActions>
      {showComment && (
        <CardContent className="comment-section">
          <div className="comment-input-container">
            <Avatar src={Image} alt="User Avatar" className="comment-avatar" />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Write a comment..."
              value={comment}
              onChange={toggleShowComment}
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
