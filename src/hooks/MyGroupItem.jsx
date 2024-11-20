import React, { useEffect, useState } from 'react'
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
import '../css/mygroup.css'
import Image from '../assets/images/MeoAnhLongNgan.webp'
import { Link } from 'react-router-dom'
import AuthorizationAxios from './Request'

export default function MyGroupItem({
  user_id,
  group_name,
  group_description,
  group_avatar,
  name_book,
  image_book,
  book_link,
  group_id,
}) {
  const [countLike, setCountLike] = useState(0)
  const [userItem, setUserItem] = useState()
  const [liked, setLiked] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data_user = await AuthorizationAxios.get(`/api/user/get/${user_id}`)
      setUserItem(data_user.data)
    }

    fetchData()
  }, [])

  const toggleLike = () => {
    setLiked(!liked)
    setCountLike(liked ? countLike - 1 : countLike + 1)
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
        className="post-header"
        avatar={
          <IconToIcon
            icon1={group_avatar}
            icon2={userItem ? userItem.avatar : ''}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={<Link to={`/detail-group/${group_id}`}>{group_name}</Link>}
        subheader={
          <Link to={`/detail-user/${user_id}`}>
            {userItem ? userItem.name : ''}
          </Link>
        }
      />
      <CardContent>
        <Typography variant="h5" component="h2" className="post-title">
          {group_description}
        </Typography>
        <a
          href="{bookLink}"
          target="_blank"
          rel="noopener noreferrer"
          className="post-image-link"
        >
          <img
            src={image_book ? image_book : ''}
            alt="Book Title"
            className="post-image"
          />
        </a>
      </CardContent>
      <CardActions className="post-actions">
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={toggleLike}
            className="post-icon-button"
            sx={{ color: liked ? 'error.main' : 'inherit' }}
          >
            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <Typography variant="body2">{countLike}</Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={toggleShowComment} className="post-icon-button">
            <CommentIcon />
          </IconButton>
          <Typography variant="body2">Comment</Typography>
        </div>
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
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              className="comment-textfield"
            />
            <IconButton
              onClick={handleCommentSubmit}
              color="primary"
              aria-label="send comment"
              className="comment-send-button"
            >
              <SendIcon />
            </IconButton>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
