import React, { useState, useEffect } from 'react'
import { Grid, IconButton, Paper, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AuthorizationAxios from '../../../../hooks/Request'
import { FaPlus } from 'react-icons/fa'
import UploadBook from '../../../../pages/UploadBook/UploadBook'
import UpdateBook from '../../../../pages/UpdateBook/UpdateBook'
import { toast } from 'react-toastify'

export default function ManageBook() {
  const [dataBook, setDataBook] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [editingBook, setEditingBook] = useState(null)

  const handleOpenUploadBook = () => {
    setIsUploading(true)
  }

  const handleEditBook = (book) => {
    setEditingBook(book)
  }

  const handleCloseUpdate = () => {
    setEditingBook(null)
  }
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this book?',
    )

    if (confirmation) {
      const previousData = [...dataBook]
      setDataBook(dataBook.filter((book) => book.id !== id))

      try {
        await AuthorizationAxios.remove(`/api/book/delete/${id}`)
        toast.success('Book deleted successfully!')
      } catch (error) {
        console.error('Error deleting book:', error)
        toast.error('Failed to delete book.')

        setDataBook(previousData)
      }
    }
  }
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/book/get-all')
        setDataBook(res.data)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    fetchBook()
  }, [])

  if (isUploading) {
    return <UploadBook onBack={() => setIsUploading(false)} />
  }

  if (editingBook) {
    return <UpdateBook book={editingBook} onClose={handleCloseUpdate} />
  }

  const columns = [
    { field: 'id', headerName: 'ID', maxWidth: 100, hide: true },
    { field: 'name', headerName: 'Book Name', maxWidth: 200 },
    {
      field: 'image',
      headerName: 'Image',
      maxWidth: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          style={{ maxWidth: '50px', height: 'auto' }}
        />
      ),
    },
    { field: 'ratings', headerName: 'Ratings', maxWidth: 150 },
    { field: 'reviews', headerName: 'Reviews', maxWidth: 150 },
    {
      field: 'assessment_score',
      headerName: 'Assessment Score',
      maxWidth: 180,
    },
    {
      field: 'link_book',
      headerName: 'Link',
      maxWidth: 200,
      renderCell: (params) =>
        params.value ? (
          <a href={params.value} target="_blank" rel="noopener noreferrer">
            View Book
          </a>
        ) : (
          'No Link'
        ),
    },
    { field: 'created_at', headerName: 'Created date', maxWidth: 200 },
    {
      field: 'edit',
      headerName: 'Edit',
      maxWidth: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleEditBook({
              id: params.row.id,
              name: params.row.name,
              image: params.row.image,
              link_book: params.row.link_book,
            })
          }
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      maxWidth: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={()=>handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ]

  const rows = dataBook.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    ratings: item.ratings,
    reviews: item.reviews,
    assessment_score: item.assessment_score,
    link_book: item.link_book,
    created_at: new Date(item.created_at).toLocaleDateString(),
  }))

  return (
    <div>
      <Typography
        variant="h4"
        color="#00635d"
        fontWeight="bold"
        align="center"
        sx={{ mt: 3 }}
      >
        Manage Books
      </Typography>
      <hr />
      <Typography
        variant="subtitle1"
        color="#00635d"
        align="left"
        sx={{ mb: 2 }}
      >
        Overview
      </Typography>
      <Grid
        container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="subtitle1"
          color="#00635d"
          align="left"
          sx={{ mb: 2 }}
        >
          Tổng số: {dataBook?.length} sách
        </Typography>
        <IconButton onClick={handleOpenUploadBook}>
          <FaPlus />
        </IconButton>
      </Grid>

      <Paper sx={{ maxHeight: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Paper>
    </div>
  )
}
