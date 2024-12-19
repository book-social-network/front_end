import React from 'react'
import {
  Select,
  MenuItem,
  Typography,
  IconButton,
  Box,
  FormControl,
  InputLabel,
} from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarIcon from '@mui/icons-material/Star'
import AuthorizationAxios from '../../../hooks/Request'

const MenuState = ({
  status,
  setStatus,
  rating,
  setRating,
  id_book,
  id_user,
}) => {
  const handleChange = async (event) => {
    const newStatus = event.target.value

    setStatus(newStatus)

    const res = await AuthorizationAxios.post(
      `/api/assessment/update-state-read/${id_book}`,
      {
        user_id: id_user,
        book_id: id_book,
        state_read: newStatus,
      },
    )
    console.log(res)
    if (res.status === 200) {
      console.log('State updated successfully!')
    } else {
      console.log('Failed to update state')
    }
  }

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Status"
            onChange={handleChange}
          >
            <MenuItem value="0">Want to Read</MenuItem>
            <MenuItem value="1">Reading</MenuItem>
            <MenuItem value="2">Read</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {(status === '1' || status === '2') && (
        <div className="rating-section">
          <Typography variant="body2">Rate it:</Typography>
          {Array.from({ length: 5 }, (_, index) => (
            <IconButton
              key={index}
              aria-label="rate"
              onClick={() => setRating(index + 1)}
            >
              {rating > index ? (
                <StarIcon style={{ color: 'gold' }} />
              ) : (
                <StarBorderIcon />
              )}
            </IconButton>
          ))}
        </div>
      )}
    </>
  )
}

export default MenuState
