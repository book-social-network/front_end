import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Avatar,
  AvatarGroup,
  Container,
  Grid,
  Typography,
  Box,
  Icon,
  Button,
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import { useUserProfile } from '../../hooks/useUserProfile'
import { FaPlus } from 'react-icons/fa6'
import { MdLogout } from 'react-icons/md'
import Post from '../../layout/User/Poster/Post'
import ModalCreatePost from '../../layout/User/Components/CenterContainer/ModalCreatePost'
import AuthorizationAxios from '../../hooks/Request'

export default function DetailGroup() {
  const [postGroup, setPostGroup] = useState(null)
  const [joinedGroups, setJoinedGroups] = useState([])
  const [isJoined, setIsJoined] = useState(false)
  const [userInGroup, setUserInGroup] = useState(null)

  const { id } = useParams()
  const { token, user } = useUserProfile()
  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await AuthorizationAxios.get(`/api/group/get-all-post-group/${id}`)
        setPostGroup(response.data)
      } catch (e) {
        console.log(e)
      }
    }

    const fetchRoleData = async () => {
      try {
        const response = await AuthorizationAxios.get(`/api/detail-group-user/get-all-user/${id}`)
        setJoinedGroups(response.data.users)

        joinedGroups.forEach((item) => {
          if (item.id === user.user.id) return setIsJoined(true)
        })
      } catch (e) {
        console.log(e)
      }
    }

    fetchGroupData()
    fetchRoleData()
  }, [id, token, user])

  return (
    <Container maxWidth="lg">
      <Box sx={{ background: '#252728', padding: 2, mb: 2 }}>
        <Box
          sx={{ width: '100%' }}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#fff"
            sx={{ width: '80%' }}
          >
            {postGroup ? postGroup.group.name : ''}
          </Typography>
          <Box
            component="img"
            src={postGroup ? postGroup.group.image_group : ''}
            alt="Group Image"
            sx={{
              width: 150,
              height: 150,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
        </Box>

        <Grid container justifyContent="space-between">
          <Grid item>
            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <AvatarGroup max={4}>
                {postGroup?.users.slice(0, 4).map((user, index) => (
                  <Avatar key={index} alt={user.name} src={user.avatar} />
                ))}
              </AvatarGroup>
              <Typography variant="body1" color="#fff">
                {postGroup ? postGroup.users.length : ''} thành viên
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              {!isJoined ? (
                <Button variant="contained" color="primary">
                  Tham gia nhóm
                </Button>
              ) : (
                <Box display="flex" flexDirection="row" gap={2}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'blue',
                      color: 'white',
                      borderColor: 'blue',
                      '&:hover': {
                        backgroundColor: '#1e88e5',
                        borderColor: '#1e88e5',
                      },
                      padding: '10px 20px',
                    }}
                  >
                    <FaPlus /> Mời
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      backgroundColor: 'red',
                      color: 'white',
                      borderColor: 'red',
                      '&:hover': {
                        backgroundColor: '#d32f2f',
                        borderColor: '#d32f2f',
                      },
                      padding: '10px 20px',
                    }}
                  >
                    <MdLogout /> Thoát nhóm
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          <Box
            className="center-content"
            sx={{
              border: '2px solid #ccc',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              borderRadius: '8px',
              textAlign: 'center',
              marginTop: '20px',
            }}
          >
            <Grid container>
              <Grid item sm={2} xs={12}>
                <img
                  src={user ? user.user.image_url : ''}
                  alt=""
                  style={{
                    width: '100%',
                    borderRadius: '50%',
                    maxWidth: '50px',
                    maxHeight: '50px',
                  }}
                />
              </Grid>
              <ModalCreatePost user={user} id_group={id} token={token}/>
            </Grid>
          </Box>
          {postGroup && postGroup.posts.length > 0 ? (
            postGroup.posts.map((post, index) => (
              <Post
                key={index}
                postId={post.post.id}
                userId={post.user.id}
                userName={post.user.name}
                userAvatar={post.user.avatar}
                bookImg={post.books[0]?.image}
                bookDescription={post.post.description}
                bookLink={post.books[0]?.link_book}
                bookTitle={post.books[0]?.name}
                likes={post.likes ? post.likes.length : 0}
                state_like={post['state-like']}
                timeStamp={post.post.created_at}
              />
            ))
          ) : (
            <Typography variant="body2" color="#b0b0b0" textAlign="center">
              Chưa có bài viết nào trong nhóm này.
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={3}>
          <Box sx={{ padding: 2, backgroundColor: '#252728', borderRadius: 2 }}>
            <Typography variant="h6" color="#fff" fontWeight="bold">
              Giới thiệu
            </Typography>
            <Typography variant="body2" color="#b0b0b0" mt={1}>
              {postGroup ? postGroup.group.description : ''}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Icon sx={{ color: 'white' }}>
                {postGroup && postGroup.group.state === 1 ? (
                  <VisibilityIcon />
                ) : (
                  <LockIcon />
                )}
              </Icon>
              <Typography variant="body2" color="#b0b0b0" mt={1}>
                {postGroup && postGroup.group.state === 1
                  ? 'Công khai'
                  : 'Riêng tư'}
              </Typography>
            </Box>
            <Typography variant="body2" color="#b0b0b0">
              {postGroup && postGroup.group.state === 1
                ? 'Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm và những gì họ đăng.'
                : 'Chỉ các thành viên mới có thể nhìn thấy những gì được đăng trong nhóm.'}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Icon sx={{ color: 'white' }}>
                <PublicIcon />
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
