import React, { useEffect, useState } from 'react'
import { 
  Avatar, 
  Box, 
  IconButton, 
  Modal, 
  TextField, 
  Typography, 
  Paper, 
  Container, 
  Divider
} from '@mui/material'
import AuthorizationAxios from '../../../hooks/Request'
import Pusher from 'pusher-js'
import { toast } from 'react-toastify'
import CommentItem from '../Components/Comments/CommentItem'
import { IoSend } from 'react-icons/io5'
import CloseIcon from '@mui/icons-material/Close'

export default function ModalComment({ postId, open, close }) {
  const [data, setData] = useState()
  const [listComment, setListComment] = useState()
  const [comment, setComment] = useState('')

  useEffect(() => {
    getData()
  }, [postId])

  const getData = async () => {
    const response = await AuthorizationAxios.get(`/api/post/get/${postId}`)
    setData(response?.data)
  }

  useEffect(() => {
    setListComment(data?.comments)
  }, [postId, data])

  useEffect(() => {
    const pusher = new Pusher('64940ba62e7f545bd4c8', {
      cluster: 'ap2',
    })

    const channelPost = pusher.subscribe(`post.${postId}`)
    channelPost.bind('comment-post', (data) => {
      console.log(data)
    })
  }, [])

  const handleCommentSubmit = async () => {
    if (comment.trim()) {
      try {
        await AuthorizationAxios.post('/api/post/insert-comment', {
          post_id: postId,
          description: comment.trim(),
        })
        toast.success('Comment submitted')
        setComment('')

        const updatedResponse = await AuthorizationAxios.get(
          `/api/post/get/${postId}`,
        )
        setListComment(updatedResponse?.data?.comments)
      } catch (e) {
        console.log(e)
        toast.error('Failed to submit comment')
      }
    }
  }

  return (
    <Modal 
      open={open} 
      onClose={close}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper 
        elevation={3} 
        sx={{
          width: '100%',
          maxWidth: 500,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 2,
          outline: 'none',
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            p: 2 
          }}
        >
          <Typography variant="h6" component="h2">
            Comments
          </Typography>
          <IconButton onClick={close} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <Box 
          sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            p: 2 
          }}
        >
          {listComment?.length > 0 ? (
            listComment.map((item, index) => (
              <CommentItem
                key={index}
                userId={item.comment.user_id}
                userImage={item.user[0].image_url}
                userName={item.user[0].name}
                commentId={item.comment.id}
                commentText={item.comment.description}
                timestamp={item.comment.created_at}
                getData={getData}
              />
            ))
          ) : (
            <Typography 
              sx={{ 
                textAlign: 'center', 
                color: 'text.secondary', 
                py: 2 
              }}
            >
              No comments yet
            </Typography>
          )}
        </Box>

        <Divider />

        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            p: 2, 
            gap: 2 
          }}
        >
          <Avatar 
            src={data?.user[0].image_url} 
            alt="User Avatar" 
            sx={{ width: 40, height: 40 }} 
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            sx={{ flexGrow: 1 }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCommentSubmit()
              }
            }}
          />
          <IconButton
            color="primary"
            onClick={handleCommentSubmit}
            disabled={!comment.trim()}
          >
            <IoSend />
          </IconButton>
        </Box>
      </Paper>
    </Modal>
  )
}