import React, { useState, useEffect } from 'react'
import { Grid, IconButton, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AuthorizationAxios from '../../../../hooks/Request'
import { FaPlus } from 'react-icons/fa'

export default function ManageBook() {
  const [dataBook, setDataBook] = useState([])

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

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, hide: true },
    { field: 'name', headerName: 'Book Name', width: 200 },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          style={{ width: '50px', height: 'auto' }}
        />
      ),
    },
    { field: 'ratings', headerName: 'Ratings', width: 150 },
    { field: 'reviews', headerName: 'Reviews', width: 150 },
    { field: 'assessment_score', headerName: 'Assessment Score', width: 180 },
    {
      field: 'link_book',
      headerName: 'Link',
      width: 200,
      renderCell: (params) =>
        params.value ? (
          <a href={params.value} target="_blank" rel="noopener noreferrer">
            View Book
          </a>
        ) : (
          'No Link'
        ),
    },
    { field: 'created_at', headerName: 'Created date', width: 200 },
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
        <IconButton>
          <FaPlus />
        </IconButton>
      </Grid>

      <Paper sx={{ height: 400, width: '100%' }}>
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
