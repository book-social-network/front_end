import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  Grid,
  TextField,
  Typography,
  Button,
  IconButton,
} from '@mui/material'
import ContainerAuthors from './ContainerAuthors'
import ContainerType from './ContainerTypes'
import LoadingDialog from './LoadingUpload'
import { IoMdReturnLeft } from 'react-icons/io'

export default function UploadBook({ onBack }) {
  const [name, setName] = useState('')
  const [image, setImage] = useState(null)
  const [link, setLink] = useState('')
  const [isUpload, setIsUpload] = useState(false)
  const [description, setDescription] = useState('')

  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedAuthors, setSelectedAuthors] = useState([])

  const handleClose = () => {
    onBack()
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleUploadBook = () => {
    setIsUpload(true)
  }

  const resetForm = () => {
    setName('')
    setImage(null)
    setLink('')
    setDescription('')
    setSelectedTypes([])
    setSelectedAuthors([])
  }

  if (isUpload) {
    return (
      <LoadingDialog
        setIsUpload={setIsUpload}
        nameBook={name}
        description={description}
        image={image}
        linkBook={link}
        arraySelectedAuthor={selectedAuthors}
        arraySelectedType={selectedTypes}
        resetForm={resetForm}
      />
    )
  }

  return (
    <Box
      paddingTop={1}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box>
        {onBack ? (
          <IconButton onClick={handleClose}>
            <IoMdReturnLeft />
          </IconButton>
        ) : (
          <></>
        )}
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
            marginBottom: '20px',
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}
          >
            Upload New Book
          </Typography>

          <Grid container spacing={3} sx={{ maxWidth: 600 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Book Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                }}
              >
                Choose Image
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
              {image && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected Image: {image.name}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Book Link"
                variant="outlined"
                value={link}
                onChange={(e) => setLink(e.target.value)}
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              />
            </Grid>

            <div style={{ width: '100%' }}>
              <ContainerAuthors
                selectedAuthors={selectedAuthors}
                setSelectedAuthors={setSelectedAuthors}
              />
            </div>
            <div style={{ width: '100%' }}>
              <ContainerType
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
              />
            </div>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleUploadBook}
                sx={{
                  bgcolor: '#000',
                  color: '#fff',
                  ':hover': { bgcolor: '#0056b3' },
                  fontWeight: 'bold',
                  padding: '12px 0',
                  width: '100%',
                }}
              >
                Submit Book
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  )
}
