import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import AuthorizationAxios from '../../hooks/Request'

export default function UpdateBook({ book, onClose }) {
  const [name, setName] = useState(book.name)
  const [linkBook, setLinkBook] = useState(book.link_book)
  const [selectedImage, setSelectedImage] = useState(null)

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0])
  }

  const handleUpdate = async () => {
    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('link_book', linkBook)
      if (selectedImage) {
        formData.append('image', selectedImage)
      }

      await AuthorizationAxios.postUpload(
        `/api/book/update/${book.id}`,
        formData,
      )

      toast.success('Book updated successfully!')
      onClose()
    } catch (error) {
      console.error('Error updating book:', error)
      toast.error('Failed to update book. Please try again.')
    }
  }

  return (
    <div>
      <Typography
        variant="h4"
        color="#00635d"
        fontWeight="bold"
        align="center"
        sx={{ mt: 3 }}
      >
        Update Book
      </Typography>
      <hr />
      <div style={{ margin: '20px' }}>
        <TextField
          fullWidth
          label="Book Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Upload New Image"
          onChange={handleFileChange}
          sx={{ mb: 2 }}
          type="file"
        />
        <TextField
          fullWidth
          label="Link to Book"
          value={linkBook}
          onChange={(e) => setLinkBook(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{ ml: 2 }}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
