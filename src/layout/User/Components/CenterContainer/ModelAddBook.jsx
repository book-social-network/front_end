import React, { useState } from 'react'
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Modal,
  Input,
  List,
  ListItem,
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import SearchIcon from '@mui/icons-material/Search'
import { toast } from 'react-toastify'
import AuthorizationAxios from '../../../../hooks/Request'

export default function ModelAddBook({
  selectedBook,
  setSelectedBook,
  isAddBookModalOpen,
  closeAddBookModal,
}) {
  const [listSearchBook, setListSearchBook] = useState([])
  const [valueSearch, setValueSearch] = useState('')

  const handleSearchBook = async () => {
    if (valueSearch.trim().length === 0) {
      toast.error('Please enter a search term')
      return
    }
    try {
      const response = await AuthorizationAxios.post(
        `/api/profession/search?type=book&search=${valueSearch}`,
      )
      setListSearchBook(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
            <Typography
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                marginLeft: '-30px',
              }}
              variant="h6"
            >
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
                onChange={(e) => setValueSearch(e.target.value)}
              />
              <IconButton onClick={handleSearchBook}>
                <SearchIcon />
              </IconButton>
            </Box>
            <List>
              {listSearchBook.length > 0 ? (
                listSearchBook.map((book, index) => (
                  <ListItem
                    key={index}
                    sx={{ padding: '10px', cursor: 'pointer' }}
                    onClick={() => {
                      setSelectedBook(book)
                      closeAddBookModal()
                    }}
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
                <Typography sx={{ textAlign: 'center' }}>
                  No books found
                </Typography>
              )}
            </List>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
