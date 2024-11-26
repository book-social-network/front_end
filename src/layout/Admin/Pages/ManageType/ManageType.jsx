import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Paper, Typography } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { DataGrid } from '@mui/x-data-grid'
import { FaPlus } from 'react-icons/fa'
export default function ManageType() {
  const [dataType, setDataType] = useState([])

  useEffect(() => {
    const fetchType = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/type/get-all')
        setDataType(res.data)
      } catch (error) {
        console.error('Error fetching book types:', error)
      }
    }

    fetchType()
  }, [])

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Type Name', width: 200 },
  ]

  // Format the rows data
  const rows = dataType.map((item) => ({
    id: item.id,
    name: item.name,
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
        Manage Book Types
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
          Total Types: {dataType?.length}
        </Typography>
        <IconButton>
          {/* Add the icon to add a new book type */}
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
