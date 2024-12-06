import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  TextField,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AuthorizationAxios from '../../hooks/Request'

export default function SearchFriends() {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/user/get-all')
        const resU = await res.data
        setUsers(resU)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }
    fetchUsers()
  }, [])

  return (
    <Autocomplete
      options={users}
      getOptionLabel={(option) => option.name || ''}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search users"
          variant="outlined"
          size="small"
        />
      )}
      renderOption={(props, option) => (
        <ListItem
          {...props}
          onClick={() => navigate(`/detail-user/${option.id}`)}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemAvatar>
            <Avatar
              src={option.avatar || 'default_avatar.jpg'}
              alt={option.name}
            />
          </ListItemAvatar>
          <ListItemText primary={option.name} />
        </ListItem>
      )}
      sx={{ width: '100%' }}
    />
  )
}
