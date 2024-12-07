import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Paper, Typography, Button } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { DataGrid } from '@mui/x-data-grid'
import { FaPlus } from 'react-icons/fa'
import UploadType from '../../../../pages/UploadType/UploadType'
import UpdateType from '../../../../pages/UpdateType/UpdateType'
import { toast } from 'react-toastify'

export default function ManageType() {
  const [dataType, setDataType] = useState([])
  const [editType, setEditType] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
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
  const handleUploadType = () => {
    setIsUploading(true)
  }

  const handleEditType = (type) => {
    setEditType(type)
  }

  const handleCloseUpdate = () => {
    setEditType(null)
  }
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this Type?',
    )

    if (confirmation) {
      const previousData = [...dataType]
      setDataType(dataType.filter((type) => type.type.id !== id))

      try {
        await AuthorizationAxios.remove(`/api/type/delete/${id}`)
        toast.success('Type deleted successfully!')
      } catch (error) {
        console.error('Error deleting type:', error)
        toast.error('Failed to delete type.')

        setDataType(previousData)
      }
    }
  }
  const columns = [
    { field: 'id', headerName: 'ID', maxWidth: 100 },
    { field: 'name', headerName: 'Type Name', maxWidth: 200 },
    { field: 'count-book', headerName: 'Count Book', maxWidth: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      maxWidth: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => handleEditType(params.row)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: 'Delete',
      headerName: 'Delete',
      maxWidth: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ]

  const rows = dataType.map((item) => ({
    id: item?.type.id,
    name: item?.type.name,
    'count-book': item['count-book'],
  }))
  if (isUploading) {
    return <UploadType onBack={() => setIsUploading(false)} />
  }
  if (editType) {
    return <UpdateType type={editType} onClose={handleCloseUpdate} />
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
        <IconButton onClick={handleUploadType}>
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
