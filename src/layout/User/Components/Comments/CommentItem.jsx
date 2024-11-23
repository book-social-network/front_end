import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { parseISO, formatDistanceToNow } from 'date-fns'

export default function CommentItem({
  userName,
  userImage,
  commentText,
  timestamp,
}) {
  const [comment, setComment] = useState(commentText)
  const [isEditor, setIsEditor] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)

  const dateObj = timestamp ? parseISO(timestamp) : null
  const timeAgo = dateObj
    ? formatDistanceToNow(dateObj, { addSuffix: true })
    : 'Invalid time'

  const handleOpen = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const handleEditComment = () => {
    setIsEditor(!isEditor)
    handleClose()
  }

  return (
    <Card
      sx={{
        backgroundColor: '#242526',
        color: '#e4e6eb',
        borderRadius: '16px',
        padding: '8px 16px',
        margin: '8px auto',
        maxWidth: '800px',
        boxShadow: 'none',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Avatar src={userImage} alt={userName} />
        </Grid>
        <Grid item xs>
          <CardContent sx={{ padding: '0' }}>
            <Typography variant="body2" fontWeight="bold">
              {userName}
            </Typography>
            {isEditor ? (
              <>
                <Input
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: '5px',
                    padding: '5px',
                    width: '300px',
                  }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter comment ..."
                />
                <Button
                  sx={{ display: 'block', margin: '5px 5px 5px 0' }}
                  variant="contained"
                >
                  Save changes
                </Button>
              </>
            ) : (
              <Typography variant="body2" sx={{ marginTop: '4px' }}>
                {commentText}
              </Typography>
            )}
          </CardContent>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '4px',
              fontSize: '14px',
              color: '#b0b3b8',
            }}
          >
            <Typography sx={{ marginRight: '8px' }}>{timeAgo}</Typography>
          </Box>
        </Grid>

        <Grid item>
          <IconButton
            size="small"
            sx={{ color: '#b0b3b8' }}
            onClick={handleOpen}
          >
            <BsThreeDotsVertical />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEditComment}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </Grid>
      </Grid>
    </Card>
  )
}
