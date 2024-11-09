import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  TextField,
} from '@mui/material';
import IconToIcon from './IconToIcon';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../css/mygroup.css';
import Image from '../assets/images/MeoAnhLongNgan.webp';

export default function MyGroups() {
  const [countLike, setCountLike] = useState(10);
  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');

  const toggleLike = () => {
    setLiked(!liked);
    setCountLike(liked ? countLike - 1 : countLike + 1);
  };

  const toggleShowComment = () => {
    setShowComment(!showComment);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      console.log('Comment submitted:', comment);
      setComment('');
    }
  };

  return (
    <Card className="post-container">
      <CardHeader
        className="post-header"
        avatar={<IconToIcon icon1={Image} icon2={Image} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Đảo mèo"
        subheader="Mèo rừng châu phi"
      />
      <CardContent>
        <Typography variant="h5" component="h2" className="post-title">
          Book Title
        </Typography>
        <Typography variant="body1" color="textSecondary" className="post-description">
          Book Description
        </Typography>
        <a href="{bookLink}" target="_blank" rel="noopener noreferrer" className="post-image-link">
          <img src={Image} alt="Book Title" className="post-image" />
        </a>
      </CardContent>
      <CardActions className="post-actions">
        <div style={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={toggleLike} className="post-icon-button" sx={{ color: liked ? 'error.main' : 'inherit' }}>
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
            <IconButton onClick={handleCommentSubmit} color="primary" aria-label="send comment" className="comment-send-button">
              <SendIcon />
            </IconButton>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
