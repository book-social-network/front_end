import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Paper, Typography, Button } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { DataGrid } from '@mui/x-data-grid'
import { FaPlus } from 'react-icons/fa'
import UploadAuthor from '../../../../pages/UploadAuthor/UploadAuthor'
import UpdateAuthor from '../../../../pages/UpdateAuthor/UpdateAuthor'
import { toast } from 'react-toastify'

export default function ManageAuthor() {
  const [dataAuthor, setDataAuthor] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [editAuthor, setEditAuthor] = useState(null)

  const openUploadAuthor = () => {
    setIsUploading(true)
  }

  const handleEditAuthor = (author) => {
    setEditAuthor(author)
  }

  const handleCloseUpdate = () => {
    setEditAuthor(null)
  }
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this author?',
    )

    if (confirmation) {
      const previousData = [...dataAuthor]
      setDataAuthor(dataAuthor.filter((author) => author.id !== id))

      try {
        await AuthorizationAxios.remove(`/api/author/delete/${id}`)
        toast.success('Author deleted successfully!')
      } catch (error) {
        console.error('Error deleting author:', error)
        toast.error('Failed to delete author.')

        setDataAuthor(previousData)
      }
    }
  }

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/author/get-all')
        setDataAuthor(res.data)
      } catch (error) {
        console.error('Error fetching authors:', error)
      }
    }

    fetchAuthor()
  }, [])

  if (isUploading) {
    return <UploadAuthor onBack={() => setIsUploading(false)} />
  }

  if (editAuthor) {
    return <UpdateAuthor author={editAuthor} onClose={handleCloseUpdate} />
  }

  const columns = [
    { field: 'id', headerName: 'ID', maxWidth: 100 },
    { field: 'name', headerName: 'Name', maxWidth: 200 },
    { field: 'born', headerName: 'Born', maxWidth: 150 },
    { field: 'dob', headerName: 'Date of Birth', maxWidth: 180 },
    { field: 'died', headerName: 'Date of Death', maxWidth: 180 },
    { field: 'description', headerName: 'Description', maxWidth: 250 },
    {
      field: 'image',
      headerName: 'Image',
      maxWidth: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt={params.row.name}
          style={{ maxWidth: '50px', maxHeight: 'auto' }}
        />
      ),
    },
    {
      field: 'edit',
      headerName: 'Edit',
      maxWidth: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditAuthor(params.row)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'delete',
      headerName: 'delete',
      maxWidth: 100,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ]

  const rows = dataAuthor.map((item) => ({
    id: item.id,
    name: item.name,
    born: item.born,
    dob: new Date(item.dob).toLocaleDateString(),
    died:
      item.died !== '0000-00-00'
        ? new Date(item.died).toLocaleDateString()
        : 'N/A',
    description: item.description || 'No description',
    image: item.image,
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
        Manage Authors
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
          Total: {dataAuthor?.length} authors
        </Typography>
        <IconButton onClick={openUploadAuthor}>
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
