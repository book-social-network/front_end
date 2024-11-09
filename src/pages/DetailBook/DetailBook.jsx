import React, { useState } from 'react'
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

export default function DetailBook() {
  const rating = 3.5 // Example rating
  const [status, setStatus] = useState('want to read')

  const handleChange = (event) => {
    setStatus(event.target.value)
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
              src="https://top10tphcm.com/wp-content/uploads/2024/04/hinh-anh-gai-xinh-han-quoc-dep-nhat-42.jpg"
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
                Tên cuốn sách
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
              <Typography
                variant="body1"
                sx={{ color: '#555', lineHeight: 1.6, mb: 3 }}
              >
                Đây là mô tả ngắn gọn về cuốn sách. Nó cung cấp một cái nhìn
                tổng quan về nội dung và điểm nổi bật để thu hút người đọc.
              </Typography>
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
                      value={status}
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
              <Box
                sx={{
                  marginTop: 3,
                  maxHeight: 200,
                  overflowY: 'auto',
                  padding: 2,
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  borderRadius: 1,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', color: '#333' }}
                >
                  Comments
                </Typography>
                {/* Example comments */}
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                  <Grid item>
                    <Avatar
                      alt="User Avatar"
                      src="https://i.pinimg.com/originals/63/d7/80/63d7807cf6d553fa722fbddf8d4fc482.jpg"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      This book looks interesting! I would love to read it soon.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                  <Grid item>
                    <Avatar
                      alt="User Avatar"
                      src="https://i.pinimg.com/originals/63/d7/80/63d7807cf6d553fa722fbddf8d4fc482.jpg"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      This book looks interesting! I would love to read it soon.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                  <Grid item>
                    <Avatar
                      alt="User Avatar"
                      src="https://i.pinimg.com/originals/63/d7/80/63d7807cf6d553fa722fbddf8d4fc482.jpg"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      Great reviews! I'm definitely adding this to my reading
                      list.
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item>
                    <Avatar
                      alt="User Avatar"
                      src="https://i.pinimg.com/originals/63/d7/80/63d7807cf6d553fa722fbddf8d4fc482.jpg"
                      sx={{ width: 40, height: 40 }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body2" sx={{ color: '#555' }}>
                      Can't wait to get my hands on this book! Seems like a
                      great read.
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}
