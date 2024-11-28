import React, { useEffect, useState } from 'react'
import AuthorizationAxios from '../../hooks/Request'
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material'
import { TiDelete } from 'react-icons/ti'

export default function ContainerAuthors({
  selectedAuthors,
  setSelectedAuthors,
}) {
  const [allAuthors, setAllAuthors] = useState([])

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await AuthorizationAxios.get('/api/author/get-all')
        setAllAuthors(res.data)
      } catch (error) {
        console.error('Failed to fetch authors:', error)
      }
    }

    fetchAuthors()
  }, [])

  const handleSelectAuthor = (event) => {
    const selectedAuthorId = event.target.value
    const authorOption = allAuthors.find(
      (author) => author.id === selectedAuthorId,
    )

    if (
      authorOption &&
      !selectedAuthors.some((author) => author.id === selectedAuthorId)
    ) {
      setSelectedAuthors((prevAuthors) => [...prevAuthors, authorOption])
    }
  }

  const handleDeleteAuthor = (authorToDelete) => () => {
    setSelectedAuthors((prevAuthors) =>
      prevAuthors.filter((author) => author.id !== authorToDelete.id),
    )
  }

  return (
    <div>
      {selectedAuthors.length > 0 && (
        <>
          <Typography variant="h6" paddingLeft={3}>
            Selected Authors
          </Typography>
          <div
            style={{
              border: '2px solid #000',
              margin: '5px 5px 5px 25px',
              padding: 10,
              borderRadius: 5,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {selectedAuthors.map((author) => (
              <Grid
                key={author.id}
                display="flex"
                padding={0.5}
                justifyContent="center"
                alignItems="center"
                marginRight={1}
                sx={{
                  borderRadius: '10px',
                  border: '1px solid blue',
                  fontSize: '13px',
                }}
              >
                <Typography variant="body2">{author.name}</Typography>
                <IconButton onClick={handleDeleteAuthor(author)}>
                  <TiDelete />
                </IconButton>
              </Grid>
            ))}
          </div>
        </>
      )}

      <Grid item xs={12} sx={{ margin: '5px 5px 5px 25px' }}>
        <FormControl fullWidth>
          <InputLabel id="author-label">Author</InputLabel>
          <Select
            labelId="author-label"
            value=""
            onChange={handleSelectAuthor}
            label="Author"
            sx={{
              bgcolor: '#fff',
              '& .MuiInputLabel-root': {
                color: '#000',
                fontWeight: 'bold',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '&:hover fieldset': { borderColor: '#000' },
                '&.Mui-focused fieldset': { borderColor: '#000' },
              },
            }}
          >
            {allAuthors
              .filter(
                (author) =>
                  !selectedAuthors.some(
                    (selected) => selected.id === author.id,
                  ),
              )
              .map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
    </div>
  )
}
