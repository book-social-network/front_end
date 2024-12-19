import React, { useEffect, useState } from 'react'
import AuthorizationAxios from '../../../../hooks/Request'
import { FaPlus } from 'react-icons/fa'
import ModalAddUser from './ModalAddUser'
import { toast } from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid'
import { Typography, Paper, Grid, IconButton, Button } from '@mui/material'
const UserList = ({ path }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpen = () => setIsOpenModal(true)
  const handleClose = () => setIsOpenModal(false)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await AuthorizationAxios.get(path)
        setUsers(res.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching users:', error)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [path])
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this user?',
    )

    if (confirmation) {
      const previousData = [...users]
      setUsers(users.filter((user) => user.id !== id))

      try {
        await AuthorizationAxios.remove(`/api/user/delete/${id}`)
        toast.success('User deleted successfully!')
      } catch (error) {
        console.error('Error deleting user:', error)
        toast.error('Failed to delete user.')

        setUsers(previousData)
      }
    }
  }

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

  const userRows = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    point: user.point,
    avatar: user.image_url,
  }))

  return (
    <Paper sx={{ height: 400, width: '100%', mt: 3 }}>
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
    </Paper>
  )
}

export default UserList
