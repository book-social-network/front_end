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
} from '@mui/material'
import IconToIcon from './IconToIcon'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import SendIcon from '@mui/icons-material/Send'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Link } from 'react-router-dom'
import AuthorizationAxios from './Request'
import { useUserProfile } from './useUserProfile'
import '../css/post.css'

export default function MyGroupItem({
  user_id,
  user_avatar,
  group_name,
  group_description,
  group_avatar,
  name_book,
  image_book,
  book_link,
  group_id,
  post_id,
  state_like,
  likes,
  user_name,
}) {
  const [countLike, setCountLike] = useState(likes)
  const [userItem, setUserItem] = useState(null)
  const [liked, setLiked] = useState(state_like)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')
  const { user } = useUserProfile()
  const navigate = useNavigate()

  const handleCardClick = ()=>{
    navigate(`/detail-group/${group_id}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data_user = await AuthorizationAxios.get(
          `/api/user/get/${user_id}`,
        )
        setUserItem(data_user.data)
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    fetchData()
  }, [user_id])

  const toggleLike = useCallback(async () => {
    setLiked((prevLiked) => !prevLiked)
    setCountLike((prevCount) => (liked ? prevCount - 1 : prevCount + 1))

    const UserId = user_id
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
  }, [liked, countLike, post_id])

  // const toggleCommentSection = () => setShowComment((prev) => !prev)

  const toggleShowComment = () => setShowComment(!showComment)

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      console.log('Comment submitted:', comment)
      setComment('')
    }
  }
  return (
    <Card className="post-container">
      <CardHeader
        avatar={<IconToIcon icon1={group_avatar} icon2={user_avatar} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link
            to={`/detail-group/${group_id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {group_name}
          </Link>
        }
        subheader={
          <Link
            to={
              user && user.user.id === user_id
                ? `/my-profile`
                : `/detail-user/${user_id}`
            }
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            {user_name}
          </Link>
        }
      />
      <CardContent onClick={handleCardClick} className="post-content">
        <div className="post-content-left">
          <a href={book_link} target="_blank" rel="noopener noreferrer">
            <img
              className="book-image"
              src={image_book || ''}
              alt={name_book || 'Book'}
            />
          </a>
        </div>
        <div className="post-content-right">
          <Typography variant="h6" className="post-title">
            {group_description}
          </Typography>
          <Typography variant="body2" className="post-description">
            {name_book}
          </Typography>
        </div>
      </CardContent>
      <CardActions className="post-actions">
        <IconButton onClick={toggleLike}>
          {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2">{countLike} liked</Typography>
        <IconButton onClick={toggleShowComment}>
          <CommentIcon />
        </IconButton>
        <Typography variant="body2">Comment</Typography>
      </CardActions>
      {showComment && (
        <CardContent className="comment-section">
          <div className="comment-input-container">
            <Avatar
              src={userItem ? userItem.avatar : ''}
              alt="User Avatar"
              className="comment-avatar"
            />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              fullWidth
              className="comment-input"
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
