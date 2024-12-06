import React, { useState } from 'react'
import { Box, Card, Grid, Typography, TextField, Button } from '@mui/material'
import AuthorizationAxios from '../../hooks/Request'
import { useNavigate } from 'react-router-dom'

export default function CreateGroup() {
  const [name, setName] = useState('')
  const [title, setTile] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage({
        file,
        url: URL.createObjectURL(file),
      })
    }
  }

  const handleCreate = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', image.file)
    const res = await AuthorizationAxios.postUpload(
      '/api/group/insert',
      formData,
    )
    const group = await res.data
    navigate(`/detail-group/${group.id}`)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f4f4f4',
        padding: '20px',
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          bgcolor: '#fff',
          p: 4,
          borderRadius: '12px',
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 4,
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
          }}
        >
          Create a New Group
        </Typography>

        <Grid container spacing={2} sx={{ maxWidth: '100%' }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Group Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { color: '#000', fontWeight: 'bold' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': { borderColor: '#000' },
                  '&.Mui-focused fieldset': { borderColor: '#000' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Group Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTile(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { color: '#000', fontWeight: 'bold' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': { borderColor: '#000' },
                  '&.Mui-focused fieldset': { borderColor: '#000' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Group Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              sx={{
                '& .MuiInputLabel-root': { color: '#000', fontWeight: 'bold' },
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '&:hover fieldset': { borderColor: '#000' },
                  '&.Mui-focused fieldset': { borderColor: '#000' },
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
              sx={{
                bgcolor: '#000',
                color: '#fff',
                ':hover': { bgcolor: '#0056b3' },
                fontWeight: 'bold',
                padding: '12px',
                width: '100%',
                boxShadow: 2,
              }}
            >
              Choose Image
              <input type="file" hidden onChange={handleImageChange} />
            </Button>
          </Grid>

          {image && (
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  mx: 'auto',
                  border: '2px solid #ddd',
                }}
              >
                <img
                  src={image.url}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{ mt: 1, textAlign: 'center', color: '#555' }}
              >
                Selected Image: {image.file.name}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleCreate}
              sx={{
                bgcolor: '#000',
                color: '#fff',
                ':hover': { bgcolor: '#0056b3' },
                fontWeight: 'bold',
                padding: '12px 0',
                width: '100%',
                boxShadow: 2,
              }}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}
