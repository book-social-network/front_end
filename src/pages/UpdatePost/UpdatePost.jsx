import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AuthorizationAxios from '../../hooks/Request'
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material'
import { toast } from 'react-toastify'

export default function UpdatePost() {
  const params = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [description, setDescription] = useState('')
  const [selectedBook, setSelectedBook] = useState(null)
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AuthorizationAxios.get(`/api/post/get/${params.id}`)
        const resP = res.data
        setData(resP)

        if (resP.post && resP.books && resP.books.length > 0) {
          setDescription(resP.post.description)
          setSelectedBook({ id: resP.books[0].id, name: resP.books[0].name })
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching post data:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [params.id])

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await AuthorizationAxios.get(`/api/book/get-all`)
        setBooks(res.data)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }
    fetchBooks()
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await AuthorizationAxios.post(`/api/post/update/${params.id}`, {
        description: description,
        book_id: selectedBook?.id,
      })
      toast.success('Post updated successfully!')
      navigate(`/detail-post/${params.id}`)
    } catch (error) {
      console.error('Error updating post:', error)
      toast.warning('Failed to update the post.')
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: 'auto',
        mt: 4,
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Update Post
      </Typography>
      {data ? (
        <form onSubmit={handleUpdate}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
          />

          <Autocomplete
            value={selectedBook}
            onChange={(event, newValue) => setSelectedBook(newValue)}
            options={books}
            getOptionLabel={(option) => option.name || ''}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField {...params} label="Book" margin="normal" />
            )}
            sx={{ mt: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Update Post
          </Button>
        </form>
      ) : (
        <Typography variant="body1">No data available to edit.</Typography>
      )}
    </Box>
  )
}
