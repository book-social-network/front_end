import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Typography, Paper, Grid, IconButton } from '@mui/material'
import AuthorizationAxios from '../../../../hooks/Request'
import { FaPlus } from 'react-icons/fa'
import ModalAddUser from './ModalAddUser'

export default function ManageUser() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpen = () => setIsOpenModal(true)
  const handleClose = () => setIsOpenModal(false)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/user/get-all')
        setUsers(res.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching users:', error)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const userColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'role', headerName: 'Role', width: 180 },
    { field: 'point', headerName: 'Point', width: 120 },
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="avatar"
          style={{ width: 40, height: 40, borderRadius: '50%' }}
        />
      ),
    },
  ]

  const userRows = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    point: user.point,
    avatar: user.image_url || '',
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
        Manage Users
      </Typography>
      <hr />
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
          Total users: {users.length}
        </Typography>
        <IconButton onClick={handleOpen}>
          <FaPlus />
        </IconButton>
      </Grid>

      <Paper sx={{ height: 400, width: '100%' }}>
        <Typography variant="h6" color="#00635d" sx={{ mb: 2 }}>
          Users List
        </Typography>
        <DataGrid
          rows={userRows}
          columns={userColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          loading={loading}
        />
      </Paper>
      <ModalAddUser openModal={isOpenModal} closeModal={handleClose} />
    </div>
  )
}
