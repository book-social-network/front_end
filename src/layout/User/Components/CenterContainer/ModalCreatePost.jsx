import React, { useState } from 'react'
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
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ModelAddBook from './ModelAddBook'
import AuthorizationAxios from '../../../../hooks/Request'

export default function ModalCreatePost({ user, idGroup, token }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenBook, setIsModalOpenBook] = useState(false)
  const [description, setDescription] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)
  const [posts, setPosts] = useState([])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)
  const openModalBook = () => setIsModalOpenBook(true)
  const closeModalBook = () => setIsModalOpenBook(false)

  const handleSubmitPost = async () => {
    try {
      const response1 = await AuthorizationAxios.post('/api/post/insert',{
        description,
        user_id: user.user.id,
        group_id: idGroup,
      })
      if (selectedBook) {
        await AuthorizationAxios.post('/api/post/insert-book', {
          post_id: response1.data.id,
          book_id: selectedBook.id,
        })
      }

      const newPost = {
        ...response1.data,
        user: { name: user.name, image_url: user.image_url },
        book: selectedBook ? { name: selectedBook.name } : null,
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
            avatar={<Avatar src={user ? user.user.image_url : ''} alt="User Avatar" />}
            title={user ? user.user.name : ''}
            subheader={
              <Button onClick={() => setIsModalOpenBook(true)}>
                {selectedBook ? `Change Book: ${selectedBook.name}` : 'Add book'}
              </Button>
            }
          />
          <Input
            aria-label="Demo input"
            multiline
            placeholder="Type something…"
            sx={{ width: '100%', marginTop: 2 }}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </Box>
      </Modal>

      <ModelAddBook
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        isAddBookModalOpen={isModalOpenBook}
        closeAddBookModal={closeModalBook}
      />
    </>
  )
}
