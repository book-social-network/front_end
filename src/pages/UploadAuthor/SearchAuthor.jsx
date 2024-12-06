import React, { useState } from 'react'
import {
  TextField,
  Autocomplete,
  Box,
  Card,
  Avatar,
  Typography,
} from '@mui/material'

function SearchAuthor({ authors }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Autocomplete
        freeSolo
        options={filteredAuthors}
        getOptionLabel={(option) => option.name}
        value={null}
        onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="find author"
            placeholder="type name author"
            fullWidth
            variant="outlined"
            sx={{
              bgcolor: '#fff',
              marginBottom: '16px',
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <Card
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                boxShadow: 3,
                marginBottom: '10px',
                width: '100%',
              }}
            >
              <Avatar
                src={option.image}
                alt={option.name}
                sx={{ width: 50, height: 50, marginRight: 2 }}
              />
              <Typography variant="body2">{option.name}</Typography>
            </Card>
          </li>
        )}
      />
    </Box>
  )
}

export default SearchAuthor
