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
import { FaUsers } from 'react-icons/fa'
import { BsFileEarmarkPostFill } from 'react-icons/bs'
import { useUserProfile } from '../../hooks/useUserProfile'
import { FaPlus } from 'react-icons/fa6'
import { MdLogout } from 'react-icons/md'
import Post from '../../layout/User/Poster/Post'
import ModalCreatePost from '../../layout/User/Components/CenterContainer/ModalCreatePost'
import AuthorizationAxios from '../../hooks/Request'
import ModalInvite from './ModalInvite'
import { toast } from 'react-toastify'
import ModalDelete from './ModalDelete'
import ModalUpdateGroup from './ModalUpdateGroup'
import IconAdmin from '../../hooks/IconAdmin'

export default function DetailGroup() {
  const [postGroup, setPostGroup] = useState(null)
  const [dataGroup, setDataGroup] = useState(null)
  const [joinedGroups, setJoinedGroups] = useState([])
  const [isJoined, setIsJoined] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenModaUsers, setIsOpenModalUsers] = useState(false)
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false)

  const { id } = useParams()
  const { token, user } = useUserProfile()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AuthorizationAxios.get(`/api/group/get/${id}`)
        setDataGroup(await res.data)
      } catch (e) {
        console.log(e)
      }
    }

    const fetchGroupData = async () => {
      try {
        const response = await AuthorizationAxios.get(
          `/api/group/get-all-post-group/${id}`,
        )
        setPostGroup(response.data)
      } catch (e) {
        console.log(e)
      }
    }

    const fetchRoleData = async () => {
      try {
        const response = await AuthorizationAxios.get(
          `/api/detail-group-user/get-all-user/${id}`,
        )
        setJoinedGroups(response.data.users)
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
    fetchRoleData()
    if (isJoined) {
      fetchGroupData()
    }
  }, [id, token, user, isJoined])

  useEffect(() => {
    joinedGroups.forEach((item) => {
      if (item.id === user.user.id) {
        setIsJoined(true)
        if (item.role_in_group === 'admin') setIsAdmin(true)
      }
    })
  }, [joinedGroups, user])

  const handleOpen = () => setIsOpenModal(true)
  const handleClose = () => setIsOpenModal(false)
  const handleOpenModaUsers = () => setIsOpenModalUsers(true)
  const handleCloseModaUsers = () => setIsOpenModalUsers(false)
  const handleOpenModalUpdate = () => setIsOpenModalUpdate(true)
  const handleCloseModalUpdate = () => setIsOpenModalUpdate(false)
  const handleJoin = async () => {
    await AuthorizationAxios.post('/api/detail-group-user/insert', {
      user_id: user?.user.id,
      group_id: id,
    })
    toast.success('Joined group success')
  }
  const handleLeave = async () => {
    await AuthorizationAxios.post('/api/detail-group-user/delete', {
      user_id: user?.user.id,
      group_id: id,
    })
    toast.warn('Leave group success')
  }
  return (
    <Container maxWidth="lg">
      <Box sx={{ background: '#d6ba73bf', padding: 2, mb: 2 }}>
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
            {dataGroup ? dataGroup.group.name : ''}
          </Typography>
          <Box
            component="img"
            src={dataGroup ? dataGroup.group.image_group : ''}
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
                {dataGroup?.users
                  .slice(0, 4)
                  .map((user, index) =>
                    user["role-in-group"] === 'admin' ? (
                      <IconAdmin image={user.user.image_url} />
                    ) : (
                      <Avatar
                        key={index}
                        alt={user.user.name}
                        src={user?.user.image_url}
                      />
                    ),
                  )}
              </AvatarGroup>
              <Typography variant="body1" color="#fff">
                {dataGroup ? dataGroup?.users.length : ''} member
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              {!isJoined ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleJoin}
                >
                  Join
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
                    onClick={handleOpen}
                  >
                    <FaPlus /> Invite
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
                    onClick={handleLeave}
                  >
                    <MdLogout /> Out group
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={9}>
          {isJoined ? (
            <>
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
                  <ModalCreatePost user={user} idGroup={id} token={token} />
                </Grid>
              </Box>
              {postGroup && postGroup.posts.length > 0 ? (
                postGroup.posts.map((post, index) => (
                  <Post
                    key={index}
                    postId={post.post.id}
                    userId={post.user.id}
                    userName={post.user.name}
                    userAvatar={post.user.image_url}
                    bookImg={post.books[0]?.image}
                    bookDescription={post.post.description}
                    bookLink={post.books[0]?.link_book}
                    bookTitle={post.books[0]?.name}
                    likes={post.likes ? post.likes.length : 0}
                    state_like={post['state-like']}
                    timeStamp={post.post.created_at}
                    noLink={false}
                    bookId={post.books[0].id}
                  />
                ))
              ) : (
                <Typography variant="body2" color="#b0b0b0" textAlign="center">
                  There are no posts in this group yet.
                </Typography>
              )}
            </>
          ) : (
            <Typography>You have not joined the group yet</Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={3}>
          <Box sx={{ padding: 2, backgroundColor: '#252728', borderRadius: 2 }}>
            <Typography variant="h6" color="#fff" fontWeight="bold">
              Introduce
            </Typography>
            <Typography variant="body2" color="#b0b0b0" mt={1}>
              {dataGroup ? dataGroup.group.description : ''}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Icon sx={{ color: 'white' }}>
                {dataGroup && dataGroup.group.state === 1 ? (
                  <VisibilityIcon />
                ) : (
                  <LockIcon />
                )}
              </Icon>
              <Typography variant="body2" color="#b0b0b0" mt={1}>
                {dataGroup && dataGroup.group.state === 0
                  ? 'Public'
                  : 'Private'}
              </Typography>
            </Box>
            <Typography variant="body2" color="#b0b0b0">
              {dataGroup && dataGroup.group.state === 1
                ? 'Anyone can see everyone in the group and what they post.'
                : 'Only members can see what is posted in the group.'}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Icon sx={{ color: 'white' }}>
                <FaUsers />
              </Icon>
              <Typography variant="body2" color="#b0b0b0" mt={1}>
                {dataGroup ? dataGroup.users.length : ''} member
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Icon sx={{ color: 'white' }}>
                <BsFileEarmarkPostFill />
              </Icon>
              <Typography variant="body2" color="#b0b0b0" mt={1}>
                {dataGroup ? dataGroup?.['count-post'] : 0} post
              </Typography>
            </Box>

            {isJoined && isAdmin && (
              <Box display="flex" flexDirection="column" mt={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOpenModaUsers}
                  sx={{ my: 1 }}
                >
                  manager member
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mb: 1 }}
                  onClick={handleOpenModalUpdate}
                >
                  Update group
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      <ModalInvite
        openModal={isOpenModal}
        closeModal={handleClose}
        id_group={id}
      />
      <ModalDelete
        openModal={isOpenModaUsers}
        closeModal={handleCloseModaUsers}
        id_group={id}
        users={dataGroup?.users}
      />
      <ModalUpdateGroup
        openModal={isOpenModalUpdate}
        closeModal={handleCloseModalUpdate}
        id={id}
        description={dataGroup?.group.description}
        image={dataGroup?.group.image_group}
        name={dataGroup?.group.name}
        state={dataGroup?.group.state}
        title={dataGroup?.group.title}
      />
    </Container>
  )
}
