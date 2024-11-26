import React, { useEffect, useState } from 'react'
import { Grid, IconButton, Paper, Typography } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { DataGrid } from '@mui/x-data-grid'
import { FaPlus } from 'react-icons/fa'

export default function ManageGroup() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch groups data from the API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/group/get-all')
        setGroups(res.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching groups:', error)
        setLoading(false)
      }
    }

    fetchGroups()
  }, [])

  // Define columns for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Group Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'user_count', headerName: 'Users', width: 180 },
    { field: 'state', headerName: 'State', width: 100 },
  ]

  // Prepare rows with data from the API
  const rows = groups.map((item) => ({
    id: item.group.id,
    name: item.group.name,
    description: item.group.description || 'No description',
    user_count: item.users.length,  // Count users in the group
    state: item.group.state === 0 ? 'Public' : 'Private',
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
        Manage Groups
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

        <Typography
          variant="subtitle1"
          color="#00635d"
          align="left"
          sx={{ mb: 2 }}
        >
          Tổng số: {groups?.length} nhóm
        </Typography>

      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}  // Use the rows created above
          columns={columns}  // Columns as defined
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={loading}  // Show loading state while fetching data
        />
      </Paper>
    </div>
  )
}
