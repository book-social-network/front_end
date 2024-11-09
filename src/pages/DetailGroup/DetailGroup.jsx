import React from 'react'
import {
  Avatar,
  AvatarGroup,
  Container,
  Grid,
  Typography,
  Box,
  Icon,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import MyGroups from '../../hooks/MyGroups'

export default function DetailGroup() {
  const isPublic = true

  return (
    <Container maxWidth="lg">
      <Box sx={{ background: '#252728', padding: 2, mb: 2 }}>
        <Box sx={{ width: '100%' }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#fff"
            sx={{ width: '100%' }}
          >
            Tên group
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <AvatarGroup max={4}>
            <Avatar
              alt="User 1"
              src="http://res.cloudinary.com/dpqqqawyw/image/upload/v1731144261/avatar/avatar-gender-neutral-silhouette-vector-600nw-2526512481_o4lren.webp"
            />
            <Avatar
              alt="User 2"
              src="http://res.cloudinary.com/dpqqqawyw/image/upload/v1731144261/avatar/avatar-gender-neutral-silhouette-vector-600nw-2526512481_o4lren.webp"
            />
            <Avatar
              alt="User 3"
              src="http://res.cloudinary.com/dpqqqawyw/image/upload/v1731144261/avatar/avatar-gender-neutral-silhouette-vector-600nw-2526512481_o4lren.webp"
            />
            <Avatar
              alt="User 4"
              src="http://res.cloudinary.com/dpqqqawyw/image/upload/v1731144261/avatar/avatar-gender-neutral-silhouette-vector-600nw-2526512481_o4lren.webp"
            />
          </AvatarGroup>
          <Typography variant="body1" color="#fff">
            24 thành viên
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <MyGroups />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box sx={{ padding: 2, backgroundColor: '#252728', borderRadius: 2 }}>
            <Typography variant="h6" color="#fff" fontWeight="bold">
              Giới thiệu
            </Typography>
            <Typography variant="body2" color="#b0b0b0" mt={1}>
              Đây là dảo mèo cute phô mai que
            </Typography>
            
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Icon sx={{color:'white'}}>
                {isPublic ? <VisibilityIcon/> : <LockIcon />}
              </Icon>
              <Typography variant="body2" color="#b0b0b0" mt={1}>
              Công khai
            </Typography>
              
            </Box>
            <Typography variant="body2" color="#b0b0b0">
                {isPublic
                  ? 'Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm và những gì họ đăng.'
                  : 'Chỉ các thành viên mới có thể nhìn thấy những gì được đăng trong nhóm.'}
              </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Icon sx={{ color:'white'}}>
                <PublicIcon/>
              </Icon>
              <Typography variant="body2" color="#b0b0b0" mt={1}>
                Hiển thị
              </Typography>
            </Box>
              <Typography variant="body2" color="#b0b0b0" mt={1}>
                Ai cũng có thể tìm thấy nhóm này.
              </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}
