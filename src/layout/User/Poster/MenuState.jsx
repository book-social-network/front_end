import React from 'react'
import { Select, MenuItem, Typography, IconButton } from '@mui/material'
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

    // Update the status state
    setStatus(newStatus)

    // Send the updated state to the server
    const res = await AuthorizationAxios.post(`/api/assessment/update-state-read/${id_book}`, {
      user_id: id_user,
      book_id: id_book,
      state_read: newStatus,
    })

    // Optionally handle the response (e.g., show a success message or error)
    if (res.status === 200) {
      // Successfully updated state
      console.log('State updated successfully!')
    } else {
      // Handle error in case the request fails
      console.log('Failed to update state')
    }
  }

  return (
    <>
      <Select
        value={status}
        onChange={handleChange}
        variant="outlined"
        size="small"
        className="status-select"
      >
        <MenuItem value="Choose state">Choose state</MenuItem>
        <MenuItem value="0">Want to Read</MenuItem>
        <MenuItem value="1">Reading</MenuItem>
        <MenuItem value="2">Read</MenuItem>
      </Select>

      {/* Show the rating section only when the status is 'Reading' (1) or 'Read' (2) */}
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
