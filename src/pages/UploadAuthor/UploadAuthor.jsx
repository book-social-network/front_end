import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  TextField,
  Grid,
  IconButton,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'react-toastify/dist/ReactToastify.css'
import AuthorizationAxios from '../../hooks/Request'
import Footer from '../../layout/User/Components/Footer/Footer'
import { toast } from 'react-toastify'
import SearchAuthor from './SearchAuthor'
import { IoMdReturnLeft } from 'react-icons/io'

function UploadAuthor({ onBack }) {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [dob, setDob] = useState(null)
  const [dod, setDod] = useState(null)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const [authors, setAuthors] = useState([])
  const handleClose = () => {
    onBack()
  }
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await AuthorizationAxios.get('/api/author/get-all')
        setAuthors(response.data)
      } catch (error) {
        console.error('Error fetching authors:', error)
      }
    }

    fetchAuthors()
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }
  const handleSubmit = async () => {
    if (dod && dob && dod.isBefore(dob)) {
      toast.error('Date of death must be greater than date of birth.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('born', born)
      formData.append('dob', dob?.format('YYYY-MM-DD'))
      formData.append('died', dod ? dod?.format('YYYY-MM-DD') : '')
      if (image) {
        formData.append('image', image)
      }

      await AuthorizationAxios.post('/api/author/insert', formData)
      setBorn('')
      setDescription('')
      setImage('')
      setName('')
      setDob(null)
      setDod(null)
      setImage('')
      setImagePreview(null)
      toast.success('Add author successfully')
    } catch (error) {
      console.error('Error', error)
      toast.error('Error in add author')
    }
  }

  return (
    <>
      <Box
        sx={{
          paddingTop: '10px',
          bgcolor: '#FFFAF0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          color: '#000',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 800, marginBottom: 4 }}>
          {onBack ? (
            <IconButton onClick={handleClose}>
              <IoMdReturnLeft />
            </IconButton>
          ) : (
            <></>
          )}

          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#333',
            }}
          >
            Authors
          </Typography>
          <SearchAuthor authors={authors} />
        </Box>

        <Card
          sx={{
            maxWidth: 400,
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
            Add new author
          </Typography>

          <Grid container spacing={3} sx={{ maxWidth: 420 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full name"
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
              <TextField
                fullWidth
                label="Place was born"
                variant="outlined"
                value={born}
                onChange={(e) => setBorn(e.target.value)}
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
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of birth"
                  value={dob}
                  onChange={(newValue) => setDob(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
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
                  )}
                />
              </LocalizationProvider>
            </Grid>

            {/* <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of dead"
                  value={dod}
                  onChange={(newValue) => setDod(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
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
                  )}
                />
              </LocalizationProvider>
            </Grid> */}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
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

            <Grid item xs={12}>
              <Button
                variant="contained"
                component="label"
                fullWidth
                sx={{
                  bgcolor: '#000',
                  ':hover': { bgcolor: '#0056b3' },
                  fontWeight: 'bold',
                  padding: '12px 0',
                }}
              >
                Tải lên ảnh
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
              {imagePreview && (
                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Image Preview"
                    sx={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                    }}
                  />
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: '#000',
                  ':hover': { bgcolor: '#0056b3' },
                  fontWeight: 'bold',
                  padding: '12px 0',
                }}
                onClick={handleSubmit}
              >
                Lưu tác giả
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
      <Footer />
    </>
  )
}

export default UploadAuthor
