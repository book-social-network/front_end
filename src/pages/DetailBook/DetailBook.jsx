import React, { useEffect, useState } from 'react'
import {
  Grid,
  Container,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
} from '@mui/material'
import Footer from '../../layout/User/Components/Footer/Footer'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import {  useNavigate, useParams } from 'react-router-dom'
import AuthorizationAxios from '../../hooks/Request'

export default function DetailBook() {
  const [dataBook, setDataBook] = useState(null)
  const [rating, setRating] = useState(0)
  const id = useParams()
  const navigate = useNavigate();

  const id_book = id.id
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AuthorizationAxios.get(`/api/book/get/${id_book}`)
        setDataBook(res?.data)
        setRating(res?.data?.assessment?.star || 0)
      } catch (error) {
        console.error('Error fetching book details:', error)
      }
    }
    fetchData()
  }, [id_book])
  const handleChange = (event) => {}

  if (!dataBook) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Loading...</Typography>
      </Container>
    )
  }

  return (
    <>
      <Container
        sx={{
          backgroundColor: '#f9f9f9',
          borderRadius: 2,
          padding: 3,
          boxShadow: 3,
          mt: 4,
          '@media (max-width: 600px)': { padding: 2, mt: 3 },
        }}
      >
        <Grid container spacing={3}>
          <Grid item sm={4} xs={12}>
            <img
              style={{
                width: '100%',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease-in-out',
              }}
              src={dataBook?.book?.image || 'default-image.jpg'}
              alt="Book"
              onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
            />
          </Grid>
          <Grid item sm={8} xs={12}>
            <Box sx={{ padding: 2 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', mb: 2, color: '#333' }}
              >
                {dataBook?.book?.name || 'Book Title'}{' '}
              </Typography>
              <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ mr: 1, color: '#555' }}>
                  Ratings:
                </Typography>
                {Array.from({ length: 5 }).map((_, index) => {
                  if (index < Math.floor(rating)) {
                    return <StarIcon sx={{ color: '#FFD700' }} key={index} />
                  } else if (index < rating) {
                    return (
                      <StarHalfIcon sx={{ color: '#FFD700' }} key={index} />
                    )
                  } else {
                    return (
                      <StarBorderIcon sx={{ color: '#FFD700' }} key={index} />
                    )
                  }
                })}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  marginBottom: 3,
                }}
              >
                {dataBook?.types && Array.isArray(dataBook?.types) ? (
                  dataBook.types.map((type, index) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor: '#e0f7fa',
                        color: '#006064',
                        borderRadius: 2,
                        padding: '4px 8px',
                        fontSize: '0.875rem',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {type.name}
                    </Box>
                  ))
                ) : (
                  <Typography variant="body1" sx={{ color: '#555' }}>
                    No types available
                  </Typography>
                )}
              </Box>

              <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                  <FormControl
                    fullWidth
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: 1,
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      '& .MuiInputLabel-root': { color: '#555' },
                      '& .MuiOutlinedInput-root': { borderColor: '#ddd' },
                      '&:hover .MuiOutlinedInput-root': {
                        borderColor: '#0056b3',
                      },
                      '& .MuiSelect-icon': { color: '#0056b3' },
                    }}
                  >
                    <InputLabel id="status-label">Trạng thái</InputLabel>
                    <Select
                      labelId="status-label"
                      label="Trạng thái"
                      onChange={handleChange}
                      sx={{ borderRadius: 1, padding: 1 }}
                    >
                      <MenuItem value="want to read">Want to Read</MenuItem>
                      <MenuItem value="reading">Reading</MenuItem>
                      <MenuItem value="finish reading">Finish Reading</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={4}>
                  <Button
                  onClick={navigate(dataBook?.book.link_book)}
                    variant="contained"
                    color="primary"
                    sx={{
                      borderRadius: 2,
                      paddingX: 3,
                      paddingY: 1.5,
                      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                      ':hover': {
                        backgroundColor: '#004080',
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    Read Book
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}
