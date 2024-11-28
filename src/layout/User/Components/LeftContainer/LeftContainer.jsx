import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Container,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  Link,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import BookSVG from '../../../../assets/images/book-open-svgrepo-com.svg'
import book1 from '../../../../assets/images/book_read/book1.jpg'
import book2 from '../../../../assets/images/book_read/book2.jpg'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import SearchIcon from '@mui/icons-material/Search'
import LinearProgessLabel from '../../../../hooks/LinearProgessLabel'
import '../../../../css/leftContainer.css'
import AuthorizationAxios from '../../../../hooks/Request'
import { useUserProfile } from '../../../../hooks/useUserProfile'

const LeftContainer = () => {
  const [data, setData] = useState()
  const navigate = useNavigate()
  const { user } = useUserProfile()
  useEffect(() => {
    const fetchData = async () => {
      const res = await AuthorizationAxios.get(
        `/api/assessment/get-assessment-user/${user.user.id}`,
      )
      const resP = await res.data
      setData(resP)
    }
    fetchData()
  }, [])

  const wantToReadCount =
    data?.filter((item) => item.assessment.state_read === 0).length || 0
  const readingCount =
    data?.filter((item) => item.assessment.state_read === 1).length || 0
  const readCount =
    data?.filter((item) => item.assessment.state_read === 2).length || 0

  return (
    <Container>
      <Box className="left-content">
        <Typography variant="h6">Currently Reading</Typography>
        <Grid>
          <IconButton>
            <AutoStoriesIcon />
          </IconButton>
          <Typography variant="p">Hôm nay bạn đọc gì?</Typography>
        </Grid>
        <Box className="search-books">
          <TextField
            placeholder="Tìm kiếm"
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <hr />
        </Box>
        <Typography variant="h6">2024 Reading Challenge</Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            className="grid-item"
            sx={{ backgroundColor: 'bisque', mt: 3 }}
          >
            <Typography variant="h4" className="small-text">
              2024
            </Typography>
            <img src={BookSVG} alt="Book" />
            <Typography variant="h4" className="small-text">
              READING
            </Typography>
            <Typography variant="h4" className="small-text">
              CHALLENGE
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box className="challenge-box">
              <Link href="#" underline="none" className="custom-link">
                <Typography variant="h4">0 </Typography>
                <Typography variant="body1">books completed</Typography>
              </Link>
              <Typography className="book-count" sx={{ fontSize: '0.75rem' }}>
                1 book behind schedule
              </Typography>
              <LinearProgessLabel full={200} completed={33} />
            </Box>
            <Link href="#" underline="none" className="custom-link">
              <Typography variant="body2">View Challenge</Typography>
            </Link>
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Link href="#">
              <img src={book1} alt="book1" />
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="#">
              <img src={book2} alt="book2" />
            </Link>
          </Grid>
          <Grid item xs={4}>
            <Link href="#">
              <img src={book1} alt="book3" />
            </Link>
          </Grid>
        </Grid>
        <hr />
        <Typography variant="h6">KỆ SÁCH CỦA TÔI</Typography>
        <Grid container>
          <Grid item xs={2}>
            {wantToReadCount}
          </Grid>
          <Grid
            item
            xs={10}
            onClick={() => {
              navigate('/myBooks?type=0')
            }}
          >
            <Typography variant="body2">Want to read</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            {readingCount}
          </Grid>
          <Grid
            item
            xs={10}
            onClick={() => {
              navigate('/myBooks?type=1')
            }}
          >
            <Typography variant="body2">Reading</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={2}>
            {readCount}
          </Grid>
          <Grid
            item
            xs={10}
            onClick={() => {
              navigate('/myBooks?type=2')
            }}
          >
            <Typography variant="body2">Read</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default LeftContainer
