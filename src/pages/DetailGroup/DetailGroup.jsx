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
  Modal,
  IconButton,
  CardHeader,
  Input,
  ListItem,
  List
} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import LockIcon from '@mui/icons-material/Lock'
import PublicIcon from '@mui/icons-material/Public'
import { toast } from 'react-toastify'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import SearchIcon from '@mui/icons-material/Search'
import SendIcon from '@mui/icons-material/Send'
import axios from 'axios'
import { useUserProfile } from '../../hooks/useUserProfile'
import Post from '../../layout/User/Poster/Post'
import { useModal } from '../../hooks/ModalContext'

export default function DetailGroup() {
  const [dataGroup, setDataGroup] = useState(null)
  const [joinedGroups, setJoinedGroups] = useState([])
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false)
  const [valueSearch, setValueSearch] = useState('')
  const [listSearchBook, setListSearchBook] = useState([])
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)
  const [posts, setPosts] = useState([])

  const { id } = useParams()
  const { token, user } = useUserProfile()
  const { isModalOpen, openModal, closeModal } = useModal()
  const openAddBookModal = () => setIsAddBookModalOpen(true)
  const closeAddBookModal = () => setIsAddBookModalOpen(false)
  const handleDescription = (e) => setDescription(e.target.value)
  const handleChange = (e) => setValueSearch(e.target.value)

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND}/api/group/get-all-post-group/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setDataGroup(response.data)
        setJoinedGroups(user ? user.groups : [])
      } catch (e) {
        console.log(e)
      }
    }
    fetchGroupData()
  }, [id, token])

  const isJoined = joinedGroups.some((group) => group.id == id)
  const handleSearchBook = async () => {
    if (valueSearch.trim().length === 0) {
      setError(true)
      toast.error('Please enter a search term')
      return
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND}/api/profession/search?type=book&search=${valueSearch}`
        )
        setListSearchBook(response.data)
        setIsSearchVisible(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleBookSelect = (book) => {
    setSelectedBook(book)
    closeAddBookModal()
    setIsSearchVisible(false)
  }

  const handleSubmitPost = async () => {
    try {
      const response1 = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/post/insert`,
        {
          description,
          user_id: user.user.id,
        }
      )
      console.log(response1);
  
      if (selectedBook) {
        const response2 = await axios.post(`${process.env.REACT_APP_BACKEND}/api/post/insert-book`, {
          post_id: response1.data.id,
          book_id: selectedBook.id,
        })
        console.log(response2);
      }
  
      const newPost = {
        ...response1.data,
        user: { name: user.user.name, image_url: user.user.image_url },
        book: { name: selectedBook ? selectedBook.name : 'No Book' },
        description,
      }
  
      setPosts([newPost, ...posts])
      toast.success('Post created successfully!')
      setDescription('')
      setSelectedBook(null)
      closeModal()
    } catch (e) {
      console.log(e)
      toast.error('Failed to create post')
    }
  }
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          {isJoined ? (
            <Button variant="contained" color="primary">
            Tham gia nhóm
          </Button>
            
          ) : (
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
              }}
            >
              Thoát nhóm
            </Button>
          )}
        </Box>

        <Box display="flex" alignItems="center" gap={1} mt={2}>
          <AvatarGroup max={4}>
            {dataGroup?.users.slice(0, 4).map((user, index) => (
              <Avatar key={index} alt={user.name} src={user.avatar} />
            ))}
          </AvatarGroup>
          <Typography variant="body1" color="#fff">
            {dataGroup ? dataGroup.users.length : ''} thành viên
          </Typography>
        </Box>
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
              style={{ width: '100%', borderRadius: '50%', maxWidth: '50px' }}
            />
          </Grid>
          <Grid item sm={10} xs={12}>
            <div
              style={{
                border: '1px solid #cdcdcd',
                borderRadius: '40px',
              }}
              onClick={openModal}
            >
              <span style={{ display: 'flex', justifyContent: 'start' }}>
                <Typography variant="body2" padding={2} color="#cdcdcd">
                  Add new post
                </Typography>
              </span>
            </div>
          </Grid>
        </Grid>
      </Box>
          {dataGroup && dataGroup.posts.length > 0 ? (
            dataGroup.posts.map((post, index) => (
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
                {dataGroup && dataGroup.group.state === 1
                  ? 'Công khai'
                  : 'Riêng tư'}
              </Typography>
            </Box>
            <Typography variant="body2" color="#b0b0b0">
              {dataGroup && dataGroup.group.state === 1
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
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Grid container spacing={3} alignItems="center" justifyContent="space-between">
            <Grid item sm={6}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }} variant="h6">
                Add new post
              </Typography>
            </Grid>
            <Grid item sm={6} container justifyContent="flex-end">
              <IconButton sx={{ display: 'flex', alignItems: 'center' }} onClick={handleSubmitPost}>
                <SendIcon sx={{ marginRight: 1 }} />
                <Typography variant="body2">Post</Typography>
              </IconButton>
            </Grid>
          </Grid>

          <CardHeader
            avatar={<Avatar src={user ? user.image_url : ''} alt="User Avatar" />}
            title={user ? user.name : ''}
            subheader={
              <Button onClick={openAddBookModal}>
                {selectedBook ? `Change Book: ${selectedBook.name}` : 'Add book'}
              </Button>
            }
          />
          <Input
            aria-label="Demo input"
            multiline
            placeholder="Type something…"
            sx={{ width: '100%', marginTop: 2 }}
            onChange={handleDescription}
            value={description}
          />
        </Box>
      </Modal>

      <Modal open={isAddBookModalOpen} onClose={closeAddBookModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <IconButton onClick={closeAddBookModal}>
                <ArrowBackIosIcon />
              </IconButton>
            </Grid>
            <Grid item xs={10}>
              <Typography sx={{ textAlign: 'center', fontWeight: 'bold', marginLeft: '-30px' }} variant="h6">
                Select a Book
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '4px 8px',
                }}
              >
                <Input
                  fullWidth
                  disableUnderline
                  placeholder="Search for a book..."
                  sx={{
                    flexGrow: 1,
                    paddingLeft: 1,
                    fontSize: '14px',
                  }}
                  onChange={handleChange}
                />
                <IconButton onClick={handleSearchBook}>
                  <SearchIcon />
                </IconButton>
              </Box>

              {isSearchVisible && (
                <List>
                  {listSearchBook.length > 0 ? (
                    listSearchBook.map((book, index) => (
                      <ListItem
                        key={index}
                        sx={{ padding: '10px', cursor: 'pointer' }}
                        onClick={() => handleBookSelect(book)}
                      >
                        <img
                          src={book.image}
                          alt={book.name}
                          style={{ width: 40, marginRight: 10 }}
                        />
                        <Typography>{book.name}</Typography>
                      </ListItem>
                    ))
                  ) : (
                    <Typography sx={{ textAlign: 'center' }}>No books found</Typography>
                  )}
                </List>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Container>
    
  )
}
