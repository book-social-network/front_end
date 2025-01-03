import React, { useEffect, useState } from 'react'
import AuthorizationAxios from '../../../../hooks/Request'
import { toast } from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid'
import { Typography, Paper, Grid, IconButton, Button } from '@mui/material'
const GroupList = ({ path }) => {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await AuthorizationAxios.get(path)
        setGroups(res.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching groups:', error)
        setLoading(false)
      }
    }

    fetchGroups()
  }, [])

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this group?',
    )

    if (confirmation) {
      const previousData = [...groups]
      setGroups(groups.filter((group) => group.id !== id))

      try {
        const res = await AuthorizationAxios.remove(`/api/group/delete/${id}`)
        console.log(res)
        toast.success('Group deleted successfully!')
      } catch (error) {
        console.error('Error deleting group:', error)
        toast.error('Failed to delete group.')

        setGroups(previousData)
      }
    }
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Group Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'user_count', headerName: 'Members', width: 180 },
    { field: 'state', headerName: 'State', width: 100 },
    {
      field: 'Delete',
      headerName: 'Action',
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

  const rows = groups.map((item) => ({
    id: item.group.id,
    name: item.group.name,
    description: item.group.description || 'No description',
    user_count: item.users.length,
    state: item.group.state === 0 ? 'Public' : 'Private',
  }))
  return (
    <div>
      <Typography
        variant="subtitle1"
        color="#00635d"
        align="left"
        sx={{ mb: 2 }}
      >
        Total: {groups?.length} groups
      </Typography>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={loading}
        />
      </Paper>
    </div>
  )
}
export default GroupList
