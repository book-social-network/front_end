import React, { useState } from 'react'
import Banner from '../../../../assets/banners/banner_center.jpg'
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Modal,
  CardHeader,
  Avatar,
  Input,
  Button,
  List,
  ListItem,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import SearchIcon from '@mui/icons-material/Search'
import SendIcon from '@mui/icons-material/Send'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../../../../css/centerContainer.css'
import { useUserProfile } from '../../../../hooks/useUserProfile'
import { useModal } from '../../../../hooks/ModalContext'
import axios from 'axios'

const CenterContainer = () => {
  const { user } = useUserProfile()
  const { isModalOpen, openModal, closeModal } = useModal()
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false)
  const [valueSearch, setValueSearch] = useState('')
  const [error, setError] = useState(false)
  const [listSearchBook, setListSearchBook] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [description, setDescription] = useState('')
  const [posts, setPosts] = useState([])

  const openAddBookModal = () => setIsAddBookModalOpen(true)
  const closeAddBookModal = () => setIsAddBookModalOpen(false)
  const handleDescription = (e) => setDescription(e.target.value)
  const handleChange = (e) => setValueSearch(e.target.value)

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
          user_id: user.id,
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
        user: { name: user.name, image_url: user.image_url },
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
        <img src={Banner} alt="" style={{ width: '100%', borderRadius: '8px' }} />
        <Typography variant="h4" className="banner-title" sx={{ marginTop: '20px' }}>
          Mừng tháng đọc sách
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '10px' }}>
          Khám phá những cuốn sách mới tuyệt vời để đọc trong tháng này và cả năm!
        </Typography>
      </Box>

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
              src={user ? user.image_url : ''}
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

      <Grid container sx={{ marginTop: '20px' }}>
        <Grid item xs={6} container justifyContent="flex-start">
          <Typography variant="body2">UPDATES</Typography>
        </Grid>
        <Grid item xs={6} container justifyContent="flex-end">
          <IconButton>
            <SettingsIcon />
            <Typography variant="body2">Customize</Typography>
          </IconButton>
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
    </>
  )
}

export default CenterContainer
