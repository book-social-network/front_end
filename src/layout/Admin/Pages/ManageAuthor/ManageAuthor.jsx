import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Paper, Typography } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { DataGrid } from '@mui/x-data-grid'
import { FaPlus } from 'react-icons/fa' // Assuming FaPlus is already imported

export default function ManageAuthor() {
  const [dataAuthor, setDataAuthor] = useState([])

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

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'born', headerName: 'Born', width: 150 },
    { field: 'dob', headerName: 'Date of Birth', width: 180 },
    { field: 'died', headerName: 'Date of Death', width: 180 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'image', headerName: 'Image', width: 150, renderCell: (params) => <img src={params.value} alt={params.row.name} style={{ width: '50px', height: 'auto' }} /> },
  ]

  // Format the rows data
  const rows = dataAuthor.map((item) => ({
    id: item.id,
    name: item.name,
    born: item.born,
    dob: new Date(item.dob).toLocaleDateString(), // format the date
    died: item.died !== '0000-00-00' ? new Date(item.died).toLocaleDateString() : 'N/A', // handle invalid date
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
          Tổng số: {dataAuthor?.length} authors
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
