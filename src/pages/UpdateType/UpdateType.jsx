import React, { useState, useEffect } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import AuthorizationAxios from '../../hooks/Request'
import { toast } from 'react-toastify'

export default function UpdateType({ type, onClose }) {
  const [name, setName] = useState(type.name)

  useEffect(() => {
    setName(type.name)
  }, [type])

  const handleUpdate = async () => {
    try {
      const data = { name }
      await AuthorizationAxios.post(`/api/type/update/${type.id}`, data)
      toast.success('Book Type updated successfully!')
      onClose()
    } catch (error) {
      console.error('Error updating book type:', error)
      toast.error('Failed to update book type.')
    }
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
        Update Book Type
      </Typography>
      <hr />
      <div style={{ margin: '20px' }}>
        <TextField
          fullWidth
          label="Type Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{ ml: 2 }}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
