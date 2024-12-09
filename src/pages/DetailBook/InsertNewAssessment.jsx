import React, { useState } from 'react'
import { Button, Input, Box } from '@mui/material'
import { toast } from 'react-toastify'
import AuthorizationAxios from '../../hooks/Request'

export default function InsertNewAssessment({ userId, bookId }) {
  const [description, setDescription] = useState('')

  const handleAddAssessment = async () => {
    try {
      if (description.trim() === '') {
        toast.warning('Please enter an assessment.')
        return
      }

      const res = await AuthorizationAxios.post('/api/assessment/insert', {
        description: description,
        book_id: bookId,
      })

      if (res?.status === 200) {
        toast.success('Assessment successfully added.')
        setDescription('')
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response
        if (status === 404) {
          toast.warning(data.message || 'Not found.')
        } else if (status === 400) {
          toast.warning('Invalid input. Please check your data.')
        } else {
          toast.error(data.message || 'An unexpected error occurred.')
        }
      } else {
        toast.error('Network error. Please try again later.')
      }
    }
  }

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 2, margin: '16px 0' }}
    >
      <Input
        placeholder="Assessment"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ flex: 1 }}
      />
      <Button variant="contained" color="primary" onClick={handleAddAssessment}>
        Add Assessment
      </Button>
    </Box>
  )
}
